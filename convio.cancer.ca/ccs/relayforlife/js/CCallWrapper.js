/* Compressed by the perl version of jsmin. */
/* JavaScript::Minifier 0.02 */

function CCallWrapper(aObjectReference,aDelay,aMethodName,aArgument0,aArgument1,aArgument2,aArgument3,aArgument4,aArgument5,aArgument6,aArgument7,aArgument8,aArgument9)
{this.mId='CCallWrapper_'+(CCallWrapper.mCounter++);this.mObjectReference=aObjectReference;this.mDelay=aDelay;this.mTimerId=0;this.mMethodName=aMethodName;this.mArgument0=aArgument0;this.mArgument1=aArgument1;this.mArgument2=aArgument2;this.mArgument3=aArgument3;this.mArgument4=aArgument4;this.mArgument5=aArgument5;this.mArgument6=aArgument6;this.mArgument7=aArgument7;this.mArgument8=aArgument8;this.mArgument9=aArgument9;CCallWrapper.mPendingCalls[this.mId]=this;}
CCallWrapper.prototype.execute=function()
{this.mObjectReference[this.mMethodName](this.mArgument0,this.mArgument1,this.mArgument2,this.mArgument3,this.mArgument4,this.mArgument5,this.mArgument6,this.mArgument7,this.mArgument8,this.mArgument9);delete CCallWrapper.mPendingCalls[this.mId];};CCallWrapper.prototype.cancel=function()
{clearTimeout(this.mTimerId);delete CCallWrapper.mPendingCalls[this.mId];};CCallWrapper.asyncExecute=function(callwrapper)
{CCallWrapper.mPendingCalls[callwrapper.mId].mTimerId=setTimeout('CCallWrapper.mPendingCalls["'+callwrapper.mId+'"].execute()',callwrapper.mDelay);};CCallWrapper.mCounter=0;CCallWrapper.mPendingCalls={};