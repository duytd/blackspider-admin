var d3 = require('d3'),
    jsdom = require('jsdom'),
    request = require('request-json'),
    fs = require('fs'),
    htmlStub = '<html><head></head><body><div id="graph"></div><script src="/bower_components/d3/d3.min.js"></script></body></html>';

var client = request.createClient('http://localhost:8888/');

// pass the html stub to jsDom
jsdom.env({
    features: {
        QuerySelector: true
    },
    html: htmlStub,
    done: function(errors, window) {

        var el = window.document.querySelector('#graph')
        var width = 1000,
            height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        var svg = d3.select(el).append('svg:svg')
            .attr("width", width)
            .attr("height", height);

        client.get('http://localhost:9000/edges/graph.json', function(err, res, body) {

            if (!err && res.statusCode == 200) {
                var graph = body
                var newGraphLinks = [];
                graph.links.forEach(function(link, index, array) {
                    if (typeof link.target != 'undefined' && typeof link.source != 'undefined') {
                        var sourceNode = graph.nodes.filter(function(n) {
                                return n._id === link.source._id;
                            })[0],
                            targetNode = graph.nodes.filter(function(n) {
                                return n._id === link.target._id;
                            })[0];
                        newGraphLinks.push({
                            source: sourceNode,
                            target: targetNode
                        });
                    }
                })

                force
                    .nodes(graph.nodes)
                    .links(newGraphLinks);

                var n = graph.nodes.length
                console.log(n)

                force.start();
                force.tick();
                force.stop();

                var link = svg.selectAll(".link")
                    .data(newGraphLinks, function(d) {
                        return d.source._id + "-" + d.target._id;
                    })
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) {
                        return 2;
                    })
                    .attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });

                var node = svg.selectAll(".node")
                    .data(graph.nodes, function(d) {
                        return d._id;
                    })
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .style("fill", function(d) {
                        return color(Math.floor((Math.random() * 5) + 1));
                    })
                    .attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    })

                node.append("title")
                    .text(function(d) {
                        return d.absPath;
                    });

                force.on("tick", function() {
                    link.attr("x1", function(d) {
                        return d.source.x;
                    })
                        .attr("y1", function(d) {
                            return d.source.y;
                        })
                        .attr("x2", function(d) {
                            return d.target.x;
                        })
                        .attr("y2", function(d) {
                            return d.target.y;
                        });

                    node.attr("cx", function(d) {
                        return d.x;
                    })
                        .attr("cy", function(d) {
                            return d.y;
                        });
                });


                var svgsrc = window.document.documentElement.innerHTML

                fs.writeFile('index.html', svgsrc, function(err) {
                    if (err) {
                        console.log('error saving document', err)
                    } else {
                        console.log('The file was saved, open index.html to see the result')
                    }
                })

            } else {
                console.log(err)
            }


        });

    }

})