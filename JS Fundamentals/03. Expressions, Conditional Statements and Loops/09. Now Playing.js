function playing([trackName,artistName,duration]) {

    let song = {artistName:artistName,trackName:trackName,duration:duration};
    console.log(`Now Playing: ${song.artistName} - ${song.trackName} [${song.duration}]`);
}

playing(['Number One', 'Nelly', '4:09']);