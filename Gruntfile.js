'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['build']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        browserify: {
            standalone: {
                src: [ 'src/<%= pkg.name %>.js' ],
                dest: './browser/dist/<%= pkg.name %>.standalone.js',
                options: {
                    browserifyOptions: {
                        standalone: '<%= pkg.name %>'
                    }
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'browser/dist/<%= pkg.name %>.standalone.min.js':
                        ['<%= browserify.standalone.dest %>'],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('test', ['jshint','mochaTest']);
    grunt.registerTask('build', ['test','browserify','uglify']);

};