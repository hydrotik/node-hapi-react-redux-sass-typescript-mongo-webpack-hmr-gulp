
print("Collections found: " + db.getCollectionNames().length);

db.createCollection('footers');
db.createCollection('hello');
db.createCollection('users');
db.users.createIndex( { "username": 1 }, { unique: true } );
db.hello.insert({name: 'watts'});


print("Collections found: " + db.getCollectionNames().length);
