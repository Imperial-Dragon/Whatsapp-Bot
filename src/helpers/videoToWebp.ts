import { exec } from 'child_process';
import { gwebp } from 'webp-converter';

function videoToWebP(inputFile: string, outputFile: string) {

    return new Promise((resolve, reject) => {
        //const conversionCommand = `ffmpeg -i ${inputFile} -vf "fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ${outputFile}.gif -y`
        
        const conversionCommand = `ffmpeg -i ${inputFile} -r 20 -f image2pipe -vcodec ppm - | convert -delay 5 - gif:- | convert -layers Optimize - ${outputFile}.gif`;
        
        exec(conversionCommand, (err, stdout, stderr) => {
            if (err) {
                console.log(stdout);
                console.log(stderr);
                reject(err);
            } else {
                let outputWebp = outputFile + '.webp';
                const result = gwebp(`${outputFile}.gif`, outputWebp, '-q 80');
                result.then((response) => {
                    resolve(response);
                })
            }
        });
    });
}

export { videoToWebP };