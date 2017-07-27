
const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;

function Sharkle(metadata, desklet_id)
{
	this._init(metadata, desklet_id)
}

Sharkle.prototype = {
	__proto__: Desklet.Desklet.prototype,

	_init: function(metadata, desklet_id)
	{
		this.width = 200;
		this.height = 200;
		
		this.metadata = metadata;
		Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);
		
		// Setup main content
		this.mainContent = new Clutter.Group();
		this.mainContent.set_size(this.width, this.height);
		this.setContent(this.mainContent);

		// Setup the sharkle image
		this.mainImageFrame = new St.Bin();
		this.mainImageFrame.set_size(this.width, this.height);
		this.mainImageFrame.depth = 0.5;
		this.sharkleImage = this.loadImage("images/white/hello_0.png");
		this.mainImageFrame.add_actor(this.sharkleImage);
		
		this.mainContent.add_actor(this.mainImageFrame);
		
		//Setup the word bubble
		this.wordBubble = new St.Bin();
		this.wordBubble.set_size(this.width, this.height);
		this.wordBubble.anchor_x = (this.width*0.63);
		this.wordBubble.anchor_y = (this.height*0.63);
		this.wordBubble.depth = 0.5;
		this.bubbleImage = this.loadImage("images/white/bubble_0.png");
		this.wordBubble.add_actor(this.bubbleImage);
		
		this.mainContent.add_actor(this.wordBubble);
		
		this.mainContent.show_all();
	},

	loadImage: function(filePath) {
		let path = "file://"+this.metadata.path+"/"+filePath;
		global.log(path);
		let image = St.TextureCache.get_default().load_uri_async(path, -1, -1);
		image.path = path;
		image.show_on_set_parent = true;
		return image;
	},
}


function main(metadata, desklet_id)
{
	return new Sharkle(metadata, desklet_id);
}

