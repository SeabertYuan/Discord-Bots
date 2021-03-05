module.exports = {
  name: 'operations',
  description: 'manipulate google sheets',
  checkDiscord(discord_id){
    let n = discord_id.length;
    for(i = 0; i < n; i++){
      let discriminant = ''; //initialize empty string
      let x = discord_id[i].length;
      for(j = 0; j < x; j++){
        if(discord_id[i][j] == ' '){
          discord_id[i] = discord_id[i].replace(discord_id[i][j], '');
          x = discord_id[i].length;
        }
      }
      discord_id[i] = discord_id[i].toLowerCase(); //redundant
      if(discord_id[i][x-5] == '#'){
        for(j = x-4; j < x; j++){
          discriminant += discord_id[i][j]; //gets last 4 digits(discriminator)
        }
        discord_id[i] = discriminant;
      }
      else
        console.log("Discord wasn't formatted properly");
    }
    console.log(discord_id);
    return discord_id;
  },
  checkName(names){
    let n = names.length;
    //let name = '';
    for(i = 0; i < n; i++){ // go through every participant
      let spaceCounter = 0
      for(j = 0; j < names[i].length; j++){
        if(names[i][j] == ' '){
          if(!spaceCounter)
            spaceIndex = j;
          spaceCounter++;
        }
        else if(names[i][j] == '('){ // if there's a bracket remove from that bracket to the end bracket
          firstBrac = j;
        }
        else if(names[i][j] == ')'){
          names[i] = names[i].replace(names[i].substring(firstBrac, j+2), '');
        }
        if(spaceCounter > 1 && j != names[i].length-1) //if there are more than 1 spaces in between (there's a middle name)
          names[i] = names[i].replace(names[i].substring(spaceIndex, j), '');
      }
      names[i] = names[i].toLowerCase();
    }
    console.log(names);
    return names;
  },
  verifyDiscord(discord_id, user, userNumbers){
    for(i = 0; i < discord_id.length; i++){
      if(userNumbers == discord_id[i] || user == discord_id[i]){
        console.log("Discord verified");
        return true;
      }
    }
    return false;
  },
  verifyName(names, username){
    for(i = 0; i < names.length; i++){
      if(username == names[i]){
        console.log("Username verfied");
        return true;
      }
    }
    return false;
  }
};
