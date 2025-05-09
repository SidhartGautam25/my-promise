// so overall whenever you do new Promise() thing and pass a function to
// it,internally javascript make a queue ( to store functions which you have
// defined in then block(we will see when and how it does that)).

// after queue initialization,javascript simply call the function
// you proivided to Promise with resolve and reject as argument

// that function do something which takes time,but javascript dont
// wait for completion and move ahead.

// and now it come to "then" block,then when you call "then" which is
// defined by javascript, it simply push the function which you provided
// to "then" to that queue.
// and like this every "then" do that and finally your queue contain
// all the function which you have provided to then.

// now when the work of that function which you have provided to Promise
// is over , you call either resolve or reject which again is provided
// by javacsript
// so when that resolve thing get called, it simply does one thing
// it call all the function available in queue in such a manner that
// output of first function became input of second,and like this
// it executes every function
