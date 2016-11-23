var Vimeo = require('vimeo').Vimeo;

//hidden information
var CLIENT_ID = process.env.CLIENT_ID
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;

//create new vimeo object
var lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

//define scope
//must do this as my site will be using an unathenticated token
//and only access private videos
var scope = process.env.SCOPE;

//create token
lib.generateClientCredentials(scope, function (err, access_token) {
        if (err) {
                throw err;
        }

        var token = access_token.access_token;

        // Other useful information is included alongside the access token
        // We include the final scopes granted to the token. This is important because the user (or api) might revoke scopes during the authentication process
        var scopes = access_token.scope;
});


module.exports = {
  getStaffPicks: function() {
    return new Promise(function(resolve, reject){
      lib.request(/*options*/{
        // This is the path for the videos contained within the staff picks channels
        path : '/channels/staffpicks/videos',
        // This adds the parameters to request page two, and 10 items per page
        query : {
          page : 2,
          per_page : 10
        }
      }, /*callback*/function (error, body, status_code, headers) {
        if (error) {
                        console.log('error');
                        console.log(error);
                        response.json("Error");
        } else {
                      var staffPicks = body.data;
                      var formattedStaffPicks = staffPicks.map(function(video){
                        return {
                          title: video.name,
                          description: video.description,
                          link: video.link,
                          author: video.user.name,
                          bio: video.user.bio,
                        };
                      });
          resolve(formattedStaffPicks);
          //response.json(formattedStaffPicks);
        }
      });


    });
  }
};
