import _ from 'lodash';

export default async (req, res, pc) => {
    let path = req.url.replace('/task3A','').split('/').filter((value) => {
      if (value !== '') return value;
    });

    if(path.length === 0) {
      return pc;
    } else if(path[0] === 'volumes') { 
      let volume = {};
      let arrVolumes = {};
      pc['hdd'].map((value, index)=> {
          volume = _.pick(value, ['size','volume']);
          arrVolumes[volume.volume] = volume.size + (arrVolumes[volume.volume] ? +arrVolumes[volume.volume].replace('B','') : 0) + 'B'; 
      });
      return arrVolumes;
    } else { 
      let response = pc;
      path.map((prop) => {
        if(response.constructor()[prop] !== undefined) {
            throw new Error('native property');
        } 
        
        response = response[prop];
      });

      if (response !== undefined) {
        return response;
      } else {
        throw new Error('No data');
      } 
    }
};

