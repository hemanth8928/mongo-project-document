// Cannot implicitly shard accessed collections because of following errmsg: A single
// update/delete on a sharded collection must contain an exact match on _id or contain the shard
// key.
// @tags: [assumes_unsharded_collection]

// Update with mods corner cases.

f = db.jstests_update3;

f.drop();
f.save({a: 1});
f.update({}, {$inc: {a: 1}});
assert.eq(2, f.findOne().a, "A");

f.drop();
f.save({a: {b: 1}});
f.update({}, {$inc: {"a.b": 1}});
assert.eq(2, f.findOne().a.b, "B");

f.drop();
f.save({a: {b: 1}});
f.update({}, {$set: {"a.b": 5}});
assert.eq(5, f.findOne().a.b, "C");

f.drop();
f.save({'_id': 0});
f.update({}, {$set: {'_id': 5}});
assert.eq(0, f.findOne()._id, "D");

f.drop();
f.save({_id: 1, a: 1});
f.update({}, {$unset: {"a": 1, "b.c": 1}});
assert.docEq({_id: 1}, f.findOne(), "E");
