/*
---

script: Elements.From.js

name: Elements.From

description: Returns a collection of elements from a string of html.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/String
  - Core/Element
  - /MooTools.More

provides: [Elements.from, Elements.From]

...
*/

Elements.from = function(text, excludeScripts){
	if (excludeScripts || excludeScripts == null) text = text.stripScripts();

	var container, match = text.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);

	if (match){
		container = new Element('table');
		var tag = match[1].toLowerCase();
		if (['td', 'th', 'tr'].contains(tag)){
			var fragment = Element.docFragment(), oldContainer = container;
			container = new Element('tbody');
			fragment.appendChild(container);
			oldContainer.appendChild(fragment);
			if (tag != 'tr') {
				fragment = Element.docFragment();
				oldContainer = container;
				container = new Element('tr');
				fragment.appendChild(container);
				oldContainer.appendChild(fragment);
			};
		}
	}

	return (container || new Element('div')).set('html', text).getChildren();
};
