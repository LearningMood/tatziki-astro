#!/bin/bash

for mp4 in public/videos/**/*.mp4; do
  webm="${mp4%.mp4}.webm"
  if [ ! -f "$webm" ]; then
    echo "Converting: $mp4"
    ~/bin/ffmpeg -i "$mp4" -c:v libvpx-vp9 -crf 30 -b:v 0 -an "$webm" -y
  fi
done

echo "Done!"