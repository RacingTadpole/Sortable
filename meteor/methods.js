'use strict';

Meteor.methods({
	/**
	 * Update the orderField of documents with given ids in a collection, incrementing it by incDec
	 * @param {String} collectionName - name of the collection to update
	 * @param {String[]} ids - array of document ids
	 * @param {String} orderField - the name of the order field, usually "order"
	 * @param {Number} incDec - pass 1 or -1
	 */
	'rubaxa:sortable/collection-update': function (collectionName, ids, orderField, incDec) {
		check(collectionName, String);
		// next three lines added by AGS for extra security
		// note this still allows non-editors to sort the rosters and roster sets, which is bad
		if (!(collectionName === 'rosters' || collectionName === 'roster_sets')) {
			throw new Meteor.Error(404, "You are trying to sort an unsortable collection");
		}
		check(ids, [String]);
		check(orderField, String);
		check(incDec, Number);
		var selector = {_id: {$in: ids}}, modifier = {$inc: {}};
		modifier.$inc[orderField] = incDec;
		Mongo.Collection.get(collectionName).update(selector, modifier, {multi: true});
	}
});
