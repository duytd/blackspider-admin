jQuery(document).ready(function() {
    var width = $('#graph').width(),
        height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    var svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("/edges/graph.json", function(error, graph) {

        var newGraphLinks = [];
        graph.links.forEach(function(link, index, array) {
            if (typeof link.target != 'undefined' && typeof link.source != 'undefined') {

                var sourceNode = graph.nodes.filter(function(n) { return n._id === link.source._id; })[0],
                        targetNode = graph.nodes.filter(function(n) { return n._id === link.target._id; })[0];
                newGraphLinks.push({source: sourceNode, target: targetNode});
            }
        })

        force
            .nodes(graph.nodes)
            .links(newGraphLinks);

        var link = svg.selectAll(".link")
            .data(newGraphLinks, function(d) {
                return d.source._id + "-" + d.target._id;
            })
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) {
                return 2;
            });

        var node = svg.selectAll(".node")
            .data(graph.nodes, function(d) {
                return d._id;
            })
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) {
                return color( Math.floor((Math.random() * 5) + 1) );
            })
            .call(force.drag)

        force.start()

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
    });

})