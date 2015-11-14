angular
  .module('journey')
  .constant('Journey', supersonic.data.model('journey'));
supersonic.data.model('journey').prototype.is_close=function(){
  return this.closed!='';
};
