// Modules
import mongoose, { Schema, model, SchemaDefinitionType, SchemaDefinition, Model, HydratedDocument, Types } from "mongoose";

type SchemaObject<T> = SchemaDefinition<SchemaDefinitionType<T>, Model<T>>;

type ObjectWithStringId<T> = T & { _id: string };

export function createSchemaFromObject<T>(schemaObject: SchemaObject<T>): mongoose.Schema<T> {
	return new Schema<T, Model<T>>(schemaObject);
}
export function createModelFromSchema<T>(collectionName: string, schema: Schema<T>) {
	return model<T, Model<T>>(collectionName, schema);
}
export function createModelFromSchemaObject<T>(collectionName: string, schemaObject: SchemaObject<T>) {
	return createModelFromSchema(collectionName, createSchemaFromObject<T>(schemaObject));
}

export function convertDocumentToObject<T>(doc: HydratedDocument<T>): ObjectWithStringId<T> {
	const json = doc.toJSON() as T;
	const _id = (doc._id as Types.ObjectId).toString();
	return {
		...json,
		_id
	};
}
