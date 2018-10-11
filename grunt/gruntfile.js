'use strict';

module.exports = function (grunt) {
    // Add configuration, tasks and plugins here
    grunt.initConfig({

        // imports the config data from the package.json
        pkg: grunt.file.readJSON('package.json'),

        sass:{
            dist: {
                files: {
                    '../css/style.css' : '../sass/style.scss'
                }
            }
        },

        watch:{
            options: {
                livereload: true
            },
            css: {
                files: ['../**/*.scss'],
                tasks: ['sass']
            }
        }
        // Register the default tasks.

    });
    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['watch']);
};
