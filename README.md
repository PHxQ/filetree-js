# Filetree-js
**Filetree-js** will recursively scan a given directory and produce the corresponding tree in JSON format.

Each tree node corresponds to a directory and stores the following data:
- Directory name
- Number of subdirectories
- List of subdirectories
- Number of files in directory
- List of files in directory, for each file there's name and size
- Total size of all files in directory
- Cumulative number of files in directory and all subdirectories (recursive)
- Cumulative size (in bytes) of directory and all subdirectories (recursive)

**TODO**: File system traversal is done depth-first. BFS could potentially be faster due to disk caching.

**TODO**: All calls to Node are synchronous. Since program is not I/O bound, async with pseudo multi-threading could speed things up quite a bit.

Output is sent to **STDOUT**. Attached `run.bat` will redirect the stream to a file.

## Requirements
- Node.js 0.12.5
- Windows 7

## License
GNU GPL v2

## Note
This app or code is a demo and is not meant to be fully featured.


## Example output

```json
{
    "name":"zf2",
    "sizeTotal":10041405,
    "sizeSelf":369783,
    "numDirsTotal":443,
    "numDirsSelf":3,
    "dirs":[
        {
            "name":"bin",
            "sizeTotal":29823,
            "sizeSelf":29823,
            "numDirsTotal":0,
            "numDirsSelf":0,
            "dirs":[
                ...
            ],
            "numFilesTotal":7,
            "numFilesSelf":7,
            "files":[
                [
                    "autoload_example.php",
                    485
                ],
                ...
            ]
        },
        ...

    ],
    "numFilesTotal":2645,
    "numFilesSelf":9,
    "files":[
        [
            ".coveralls.yml",
            17
        ],
        ...
    ]
}
```