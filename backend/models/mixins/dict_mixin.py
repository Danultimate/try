import enum
from collections import Iterable
from enum import Enum

from sqlalchemy import inspect


class DictMixin:

    def to_dict(self):
        state = inspect(self)
        mapper = inspect(self.__class__)
        result = dict()

        for column in mapper.columns:
            if not column.info.get('hidden', False):
                if column.foreign_keys:
                    result[column.name[:-3] if column.name.endswith('_id') else column.name] = \
                        getattr(self, column.name).value if isinstance(getattr(self, column.name),
                                                                       enum.Enum) or isinstance(
                            getattr(self, column.name), Enum) else getattr(self, column.name)
                else:
                    result[column.name] = getattr(self, column.name).value if isinstance(getattr(self, column.name),
                                                                                         enum.Enum) or isinstance(
                        getattr(self, column.name), Enum) else getattr(self, column.name)

        for relationship in mapper.relationships:
            key = relationship.key
            if key in state.dict and key not in state.unloaded:
                value = state.dict[key]
                result[key] = [c.id for c in value] \
                    if isinstance(value, Iterable) else value.id if value is not None else value

        return result

    def from_dict(self, payload):

        columns = self.__mapper__.columns

        if 'created_at' in payload:
            payload.pop('created_at', None)
        if 'updated_at' in payload:
            payload.pop('updated_at', None)
        if 'updated_by' in payload:
            payload.pop('updated_by', None)
        if 'created_by' in payload:
            payload.pop('created_by', None)

        for c in columns:
            if c.name in payload:
                if c.name in payload:
                    setattr(self, c.name, payload[c.name])

        relationship_keys = self.__mapper__.relationships.keys()
        for r in relationship_keys:
            fk = r + '_id'
            if fk in list(columns.keys()) and r in payload:
                if r in payload:
                    setattr(self, fk, payload[r])
