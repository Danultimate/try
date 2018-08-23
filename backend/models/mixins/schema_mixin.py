
class SchemaMixin:

    def from_schema(self, schema):
        columns = self.__mapper__.columns
        for c in columns:
            if hasattr(schema, c.name):
                setattr(self, c.name, getattr(schema, c.name))

        relationship_keys = self.__mapper__.relationships.keys()
        for r in relationship_keys:
            fk = r + '_id'
            if fk in list(columns.keys()) and hasattr(schema, r):
                setattr(self, fk, getattr(schema, r))
