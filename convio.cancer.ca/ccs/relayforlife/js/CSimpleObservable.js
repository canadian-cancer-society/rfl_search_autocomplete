/* Compressed by the perl version of jsmin. */
/* JavaScript::Minifier 0.02 */

function CSimpleObservable(aIsAsync)
{this.mObservers=new CList();this.mIsAsync=aIsAsync||false;}
CSimpleObservable.prototype={notify:function(aValue)
{var length=this.mObservers.getLength();for(var i=0;i<length;++i)
{if(this.mIsAsync)
{var callwrapper=new CCallWrapper(this.mObservers.getAt(i),30,'observe',aValue);CCallWrapper.asyncExecute(callwrapper);}
else
{this.mObservers.getAt(i).observe(aValue);}}},addObserver:function(aObserver)
{if(!aObserver.observe)
{throw'CObserver.addObserver: not an observer';}
this.mObservers.addUnique(aObserver);},removeObserver:function(aObserver)
{this.mObservers.removeUnique(aObserver);}};