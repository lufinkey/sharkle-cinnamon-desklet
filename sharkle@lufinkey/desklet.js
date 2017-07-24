
const Desklet = imports.ui.desklet;

function Sharkle(metadata, desklet_id)
{
	this._init(metadata, desklet_id)
}

Sharkle.prototype = {
	__proto__: Desklet.Desklet.prototype,

	_init: function(metadata, desklet_id)
	{
		Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);
	}
}


function main(metadata, desklet_id)
{
	let desklet = new Sharkle(metadata, desklet_id);
	return desklet;
}

