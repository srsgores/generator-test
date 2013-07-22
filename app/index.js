"use strict";
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");

var TestGenerator = module.exports = function TestGenerator(args, options, config)
{
	yeoman.generators.Base.apply(this, arguments);

	this.on("end", function ()
	{
		this.installDependencies({ skipInstall: options["skip-install"] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(TestGenerator, yeoman.generators.Base);

TestGenerator.prototype.askFor = function askFor()
{
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			name: "name",
			message: "What is the name of your project?"
		},

		{
			name: "description",
			message: "Give me a description on what your app is supposed to do",
			default: "A sample description"
		},

		{
			name: "keywords",
			message: "Give me keywords that correspond to the site. (comma-separated)",
			default: "keyword 1, keyword 2, keyword 3, etc."
		},

		//author and header info
		{
			name: "authorName",
			message: "Who is the creator of this site?",
			default: "Sean Goresht"
		},

		{
			name: "authorURL",
			message: "What is the site where the author can be reached?",
			default: "http://seangoresht.com"
		},

		{
			name: "authorGitHub",
			default: "srsgores",
			message: "What is your gitHub account?"
		},

		{
			name: "authorTwitter",
			default: "SGoresht",
			message: "What is your Twitter account?"
		},

		{
			name: "authorCompanyName",
			default: "Company Name",
			message: "(optional) What is your company name?"
		},

		//SASS stuff
		{
			name: "includeIcomoon",
			type: "confirm",
			default: true,
			message: "Would you like to include default Icomoon vector icon font?"
		},

		{
			name: "includeBasicNav",
			type: "confirm",
			default: true,
			message: "Would you like to include basic navigation styles in your project?"
		}
	];

	this.prompt(prompts, function (props)
	{
		this.name = props.name;
		this.description = props.description;
		this.keywords = props.keywords;
		this.authorName = props.authorName;
		this.authorURL = props.authorURL;
		this.authorGitHub = props.authorGitHub;
		this.authorTwitter = props.authorTwitter;
		this.authorCompanyName = props.authorCompanyName;

		//scss stuff
		this.includeIcomoon = props.includeIcomoon;
		this.includeBasicNav = props.includeBasicNav;

		cb();
	}.bind(this));
};

TestGenerator.prototype.app = function app()
{
	this.template("_index.html", "index.html");

	//create javascript files
	this.mkdir("js");
	this.template("_main.js", "js/main.js");

	//sass files
	this.mkdir("sass");
	this.mkdir("sass/partials");
	this.template("sass/_style.scss", "sass/style.scss");
	this.copy("sass/partials/_forms.scss", "sass/partials/_forms.scss");
	this.copy("sass/partials/_grids.scss", "sass/partials/_grids.scss");
	this.copy("sass/partials/_helpers.scss", "sass/partials/_helpers.scss");
	this.copy("sass/partials/_media-queries.scss", "sass/partials/_media-queries.scss");
	if (this.includeIcomoon) {
		this.mkdir("sass/partials/icomoon");
		this.copy("sass/partials/icomoon/_icomoon.scss", "sass/partials/icomoon/_icomoon.scss");
	}
	if (this.includeBasicNav) {
		this.copy("sass/partials/_nav.scss", "sass/partials/_nav.scss");
	}
	this.copy("sass/partials/_reset.scss", "sass/partials/_reset.scss");
	this.copy("sass/partials/_type.scss", "sass/partials/_type.scss");
	this.copy("sass/partials/_variables.scss", "sass/partials/_variables.scss");

	//bower dependency
	this.template("_bower.json", "bower.json");
};

TestGenerator.prototype.projectfiles = function projectfiles()
{
	this.copy("editorconfig", ".editorconfig");
	this.copy("jshintrc", ".jshintrc");
};
