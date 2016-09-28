/* Compressed by the perl version of jsmin. */
/* JavaScript::Minifier 0.02 */

function CList(aArray)
{this.mArray=aArray||[];}
CList.prototype.getLength=function()
{return this.mArray.length;};CList.prototype.getAt=function(aIndex)
{if(aIndex<0||aIndex>=this.mArray.length)
{return undefined;}
return this.mArray[aIndex];};CList.prototype.removeAll=function()
{this.mArray=[];};CList.prototype.removeAt=function(aIndex)
{var length=this.mArray.length;if(length==0)
{return;}
switch(aIndex)
{case-1:break;case 0:this.mArray.shift();break;case length-1:this.mArray.pop();break;default:var head=this.mArray.slice(0,aIndex);var tail=this.mArray.slice(aIndex+1);this.mArray=head.concat(tail);break;}};CList.prototype.insertAt=function(aObject,aIndex)
{switch(aIndex)
{case-1:break;case 0:this.mArray.unshift();break;case length:this.mArray.push();break;default:var head=this.mArray.slice(0,aIndex-1);var tail=this.mArray.slice(aIndex);this.mArray=head.concat([aObject]);this.mArray=this.mArray.concat(tail);break;}};CList.prototype.findIndexOf=function(aObject)
{var length=this.mArray.length;for(var i=0;i<length;++i)
{if(this.mArray[i]==aObject)
{return i;}}
return-1;};CList.prototype.addUnique=function(aObject)
{var i=this.findIndexOf(aObject);if(i==-1)
{this.mArray[this.mArray.length]=aObject;}};CList.prototype.removeUnique=function(aObject)
{var length=this.mArray.length;if(length==0)
{return;}
var i=this.findIndexOf(aObject);this.removeAt(i);};