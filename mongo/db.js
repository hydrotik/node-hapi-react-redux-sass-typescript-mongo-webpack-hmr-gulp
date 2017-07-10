
print("Collections found: " + db.getCollectionNames().length);

db.createCollection('footers');

print("Collections found: " + db.getCollectionNames().length);
