SVIFT.vis.example.simple = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  module.setup = function () {
    //Create a simple rectangle
    module.g.append('rect')
      .attr('width', 50)
      .attr('height', 50)
      .attr('y', 50)
      .attr('x', 50)
      .style('stroke','#000')
      .style('fill','transparent');
  };

  module.resize = function () {
    //If graphic is resized    
    var width = module.container.node().offsetWidth,
      height = module.container.node().offsetHeight;

    //The endpoint of the animation is updated
    module.timeline.rect.obj.interpolate = d3.interpolate(50, width-100);

    //If the animation is not running anymore we should update everything
    if(!module.playState){
      module.draw(module.playHead);
    }
  };

  module.drawRect = function(t){
    //The draw command for the rectangle
    module.g.select('rect').attr('x', module.timeline.rect.obj.interpolate(module.timeline.rect.obj.ease(t)));
  };

  //Last the actual timeline, because we need to include functions from above, better place it last
  module.timeline = {
    //The rectangle should be animated over 5 seconds, using the drawRect function, easing and interpolation are stored in the obj container
    rect: {start:0, end:5000, func:module.drawRect, obj:{ease:d3.easeCubicInOut, interpolate:null}}
  };

  return module;
 });