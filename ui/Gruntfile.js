module.exports = function(grunt) {


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		,js_files:[
					
				  ]
		,concat: {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ';'
		  },

		   //JS files
	      libs: {    // External JS Libs all go here.
	        src:[
 					// 'dependencies/*.js'
					'controllers/*.js'
					,'filters/*.js'
					// ,'directives/*.js'
					,'services/*.js'					
	        ]
	        ,dest: '../public/js/script.js'
	        ,nonull: true   //Complaint if there's a missing lib.
	      }
		}
		, ngtemplates: {
			angularApp : {
				options:      {
		          base:       'views',        // $templateCache ID will be relative to this folder
		          prepend:    'views/',  // (Optional) Prepend path to $templateCache ID
		          module:     'angularApp',               // (Optional) The module the templates will be added to
		          htmlmin: {
		            collapseBooleanAttributes:      true,
		            collapseWhitespace:             true,
		            removeAttributeQuotes:          true,
		            removeComments:                 true, // Only if you don't use comment directives!
		            removeEmptyAttributes:          true,
		            removeRedundantAttributes:      true,
		            removeScriptTypeAttributes:     true,
		            removeStyleLinkTypeAttributes:  true
		          }

		        },
		        src:          ['views/**.html'],
		        dest:         '../public/js/angularApp.templates.js'
		    }
		}
	});




  	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-angular-templates');
  	
  	grunt.registerTask('default', ['concat:libs','ngtemplates:angularApp']);

}