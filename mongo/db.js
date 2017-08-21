
print("Collections found: " + db.getCollectionNames().length);

db.createCollection('footers');
db.createCollection('hello');
db.createCollection('user');
db.createCollection('objects');
db.createCollection('schemas');
db.createCollection('pages');

db.user.createIndex( { "username": 1 }, { unique: true } );
db.user.insert({
    "username": "admin",
    "password": "$2a$10$rQTAx8BFMlXvN.dezQ68duwvV1UsSiM31zFn.8HSOrazR21xqEAJm",
    "salt": "$2a$10$rQTAx8BFMlXvN.dezQ68du"
})
db.hello.insert({name: 'watts'});

db.objects.ensureIndex({ "data.title": "text", "data.description": "text", "data.story": "text"}, { "default_language": "none" });

print("Collections found: " + db.getCollectionNames().length);
