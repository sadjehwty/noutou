angular
  .module('journey')
  .constant('Journey', supersonic.data.model('journey'));
var Journey=supersonic.data.model('journey');
Journey.prototype.costs=function(){
  var Cost=supersonic.data.model('cost');
  return Cost.all({id_journey: this.id});
};
Journey.prototype.is_close=function(){
  return this.closed!='';
};
