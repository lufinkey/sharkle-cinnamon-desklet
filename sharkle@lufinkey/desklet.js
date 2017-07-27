
const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Lang = imports.lang;
const Mainloop = imports.mainloop;



function Animation(fps)
{
	this._init(fps);
}
Animation.prototype = {
	_init: function(fps)
	{
		this.images = [];
		this.fps = fps;
	},
	
	addImage: function(image)
	{
		this.images.push(image);
	},
}




function AnimationPlayer()
{
	this._init();
}
AnimationPlayer.prototype = {
	_init: function(){
		this.loop_id = 0;
		this.animation = null;
		this.frame = 0;
		this.onUpdate = null;
	},
	
	setAnimation: function(animation)
	{
		if(this.animation!=null)
		{
			Mainloop.source_remove(this.loop_id);
			this.loop_id = 0;
		}
		this.frame = 0;
		this.animation = animation;
		if(this.animation!=null)
		{
			this.loop_id = Mainloop.timeout_add(1000.0/this.animation.fps, Lang.bind(this, this._update_loop));
		}
		if(this.onUpdate!=null)
		{
			this.onUpdate();
		}
	},
	
	getCurrentImage: function()
	{
		if(this.animation==null)
		{
			return null;
		}
		else if(this.animation.images.length > 0)
		{
			return this.animation.images[this.frame];
		}
		return null;
	},
	
	_update_loop: function()
	{
		this.frame++;
		if(this.frame >= this.animation.images.length)
		{
			this.frame = 0;
		}
		this.loop_id = Mainloop.timeout_add(1000.0/this.animation.fps, Lang.bind(this, this._update_loop));
		if(this.onUpdate!=null)
		{
			this.onUpdate();
		}
	},
}



function Sharkle(metadata, desklet_id)
{
	this._init(metadata, desklet_id);
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
		
		//load animations
		this.idleAnimation = new Animation(8);
		for(var i=0; i<=7; i++)
		{
			this.idleAnimation.addImage(this.loadImage("images/white/idle_"+i+".png"));
		}
		
		

		// Setup the shark
		var shark = new St.Bin();
		shark.set_size(this.width, this.height);
		
		var lastSharkActor = null;
		var sharkPlayer = new AnimationPlayer();
		sharkPlayer.onUpdate = function(){
			if(lastSharkActor!=null)
			{
				shark.remove_actor(lastSharkActor);
			}
			lastSharkActor = sharkPlayer.getCurrentImage();
			if(lastSharkActor!=null)
			{
				shark.add_actor(lastSharkActor);
			}
		};
		sharkPlayer.setAnimation(this.idleAnimation);
		
		this.shark = shark;
		this.sharkPlayer = sharkPlayer;
		
		this.mainContent.add_actor(this.shark);
		
		//Setup the word bubble
		this.wordBubble = new St.Bin();
		this.wordBubble.set_size(this.width, this.height);
		this.wordBubble.anchor_x = (this.width*0.63);
		this.wordBubble.anchor_y = (this.height*0.63);
		
		this.mainContent.add_actor(this.wordBubble);
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

