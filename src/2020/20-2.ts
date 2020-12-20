import { calculateWaterRoughnessByImage } from "./jurassic-jigsaw/jurassic-jigsaw-2";

const input = `Tile 3923:
...##.....
.##.#..#.#
###....#..
...#...#.#
....#.#...
..........
.....#.###
.##.#..#..
..##..#...
..#.#.##..

Tile 1229:
###.....#.
..########
...##...#.
...#..#...
....#.....
..#.....#.
#......#..
#.....##.#
##.#....##
.##.......

Tile 1801:
..###...#.
.....#....
.....#...#
#...##...#
#........#
.....#....
#.####..#.
.....#....
.#.#......
..#..###..

Tile 3643:
##..#.#...
.......#.#
#.#..#.###
.....#.#..
.......#..
........#.
..#..#.#.#
#........#
#...#..###
..#.......

Tile 2141:
...###.##.
#.##..#...
##.#.....#
#..#.....#
#.#..###.#
.......###
#...##.###
#......#..
#...#....#
.##..##.#.

Tile 1289:
....#...#.
###.....##
.##.......
....#..##.
.#.......#
...#....#.
...#.#.##.
.##..##..#
.........#
.##.####..

Tile 3373:
#####.####
..###.##..
#..#...##.
.#....#..#
.......#.#
...#..#.##
#.#..##...
####....#.
....##.#..
.###.####.

Tile 1399:
..#.#.#...
#..#...#.#
...####.##
.....#....
........##
.......#..
.##...#...
#..#......
.....#..#.
#...#..###

Tile 3259:
###...#.##
..........
..........
...#..##..
#....###.#
#....##...
#.##.#.###
....##...#
.........#
#..##.#..#

Tile 3469:
#..#####.#
#..#.....#
......#...
..#.##.##.
#..##....#
......##..
#.#.....#.
.##.......
#.#.......
#..#...###

Tile 2143:
##.#.###.#
....#..##.
#.........
#....##...
#.......#.
.###......
.#....#..#
#.#......#
.....#..#.
##.####.#.

Tile 2663:
....#####.
.#..#.....
.#......##
.#........
#....##..#
#..#......
##..##...#
#.....#.##
#...#...##
#....#...#

Tile 3067:
#.#.##..#.
..........
#..#......
#...#....#
#.##.#....
##.......#
#....#....
#......#..
#....#.#.#
##.#......

Tile 2903:
##...#.#.#
..#....#.#
#.##.#.###
#.#..#...#
#......#.#
........#.
#.#.#...#.
##.#...##.
...#..#.##
####.##.##

Tile 1471:
###.##..#.
#....#.#..
..##.#...#
........#.
#.....##..
.#........
#..#.....#
#.....##.#
.#...###..
..##..#.##

Tile 3251:
.####..#..
.#.......#
#.##.#....
.......###
.#..#....#
....#....#
#...####..
##..#.####
.......###
....#....#

Tile 1583:
...#..###.
.....###..
#..##...##
######..#.
.....###.#
#..#.#....
.#..###..#
..#...##..
#.#.....##
###..##..#

Tile 1747:
##.#..#...
......#.##
....#....#
.....#...#
#..#.#..##
#...#.....
#......#.#
#....##.#.
....#...#.
##....##..

Tile 1259:
#..#.....#
...##.#.##
.#...#.#..
.....##.#.
#......#..
#........#
........#.
.##.....##
###.#..##.
###..#....

Tile 1993:
#..#......
#..#..##.#
##.##..###
.....##...
.#.#..#..#
......#..#
....#.....
....#..#..
#.#####..#
..#..####.

Tile 3391:
#..####...
###....##.
##.....###
..#.......
#.....#..#
.#..#..#.#
#....##...
....#.#...
.#.......#
..###.##..

Tile 3881:
...#.#..#.
.#..##.##.
#.##.#.#..
.#..#.....
.....#.#.#
###....#.#
#..#.....#
......#..#
....#.....
####..#.##

Tile 1931:
#.....#..#
.#.......#
#.##.#..#.
..........
#.#.#.....
##......##
.#........
###..#.#..
#.#.#....#
.#.#.###.#

Tile 1907:
#...###.##
#.....#.#.
......#..#
#........#
#.........
#.#.##...#
##..#.....
..#......#
.#.##.#...
#.##.#####

Tile 3329:
.##.#..#.#
#....##..#
.....#..#.
..##......
#...#.##..
......#...
...#.#.#..
#...#.....
##.##....#
..##......

Tile 1009:
#...#.#.#.
..#...##..
#....##.##
##...##...
#.#..##...
##.##...##
##...##.#.
..#..#...#
..###.####
....##..#.

Tile 2011:
...#...#..
#..#.....#
.#......##
##...###..
#...#.....
..........
#.#.#....#
###....#..
.#...##...
####..###.

Tile 3467:
##..#.####
##.#.....#
#.#..#.#..
.##....###
#........#
..........
.###..#..#
......#..#
..#.....##
.###.#....

Tile 3533:
.#.###...#
#...#..##.
.##.##...#
..#.####.#
..#..#...#
.#..#.#...
#........#
.#..#....#
....#...#.
##.###...#

Tile 3203:
#..#######
...#....#.
...###...#
....#.....
.......#.#
........##
#.##.#..#.
..###...##
#...##....
#..###..#.

Tile 1307:
#..##..###
.#.##....#
....##...#
..#......#
#.##......
###.#..#..
##.##...#.
##.#..####
#...#....#
######.#..

Tile 1087:
#...#####.
..#...#.#.
#.##......
.#....#..#
#.........
..##..#..#
##.......#
#.##.#..##
#........#
#...##.###

Tile 1879:
#.#...#.##
..#...##.#
#....##..#
#........#
#.........
#...#.....
#..#.###.#
##..#.....
#...#.....
..##.#.#..

Tile 1733:
###.##.#..
..##.#.#.#
...#......
....#.#..#
.....#...#
#...#....#
#...#####.
#..#..#...
#..#.....#
#.....##.#

Tile 2357:
.##.##.#.#
..##.##.#.
##.#.#...#
..#.....#.
...#..##..
.#......#.
.......#.#
##..######
#.........
#.#.######

Tile 3929:
...##....#
.##.###...
#.....##.#
..#.#..#..
..#..#....
#....#..##
#...#.#..#
.....###..
#.........
######.#.#

Tile 2621:
..#######.
....#..#..
#......###
#......#.#
#.......##
........#.
..##...#.#
.####.##.#
..#####..#
###.....##

Tile 1787:
....#.##..
......###.
..#.##.#.#
###....##.
#.#..#...#
...###.#.#
#......###
#.#....#..
...#...##.
###.#.##.#

Tile 1549:
#.#####.##
..##...###
#..#.#...#
.#...##..#
.#....##..
.......#.#
........##
..#.#.....
..........
....######

Tile 1933:
.####.####
#...#....#
#......##.
....#...##
###..#...#
##.#.##...
#....#..##
...#......
##........
#.#..#.##.

Tile 3557:
#..#.####.
#....#.#.#
#.....##..
.#.#....#.
.##.#..##.
#.##.#...#
..#....##.
#..#......
##..#...##
.#.##.#..#

Tile 3631:
###...##.#
.##....#..
#..##....#
......#...
...#..#..#
...#.....#
.........#
##..#..#.#
##.###....
##.#...#..

Tile 3877:
.##..#.##.
..#.#..#..
......#...
...#...#.#
.........#
#..#.....#
##.#...#.#
#......#.#
#.#.......
#####..##.

Tile 2909:
#..##...#.
###.#....#
#.##......
...#.#.###
#.#.##.###
....#..#..
...#.....#
##........
#.#......#
##.#..#..#

Tile 1873:
#..#.##.##
.#...#.#.#
..........
#.##.#..#.
.#..#.##.#
#..#....##
.......#..
.......#.#
##.#....#.
.#########

Tile 3539:
###.#..#..
##.....###
#...#.#..#
#....#.#.#
#..#......
......#...
....#....#
#...#...#.
....##.###
.#..#..#.#

Tile 1657:
..##..###.
#.......#.
.##.....#.
#..#.##..#
#.....#...
..#.......
#.#...#.##
......#...
.#.#######
##.....#..

Tile 2753:
#..#.#####
.#.###.#.#
..##....#.
###.....#.
.#.#.##...
##...#.#.#
##.###..#.
#####..#..
#.##...#..
..######.#

Tile 1409:
####.##..#
..#..#.#..
........##
..#...#.#.
.##....#.#
#..#.....#
.........#
#..##.....
#.##.#..##
.#.#.#.###

Tile 2243:
..#.##..##
.........#
#....##.#.
.#.#....##
##...#....
.#....#.##
#....#.#..
#.#..#....
#..#...#..
....#####.

Tile 3541:
#.#...##.#
#..#..#.##
..##.##..#
.....#.#.#
....#.####
#...#..##.
...#...##.
#....#..##
..##....#.
..#..#.#.#

Tile 3229:
.....#..#.
#...#..#..
..#.#.....
##.#..#.##
##.....#.#
..#.#.##..
...#...###
.##.......
..##......
..#.##.#.#

Tile 1019:
..####.#.#
....###..#
##........
###.....#.
##..#..#.#
.....##...
..#...#..#
......#...
#..#.....#
.....####.

Tile 1663:
#.##.#####
#.##..##.#
#.......##
#...#.##.#
......#...
#...#....#
.....#..##
#.#.#.##.#
....#..#.#
#.###...##

Tile 1567:
.##.##....
..#..#..##
.#....##.#
....#...#.
#......#..
#..#....#.
#...##....
....#...#.
..#....###
#.#.#.##.#

Tile 3833:
.#.....#.#
#.........
#...#.....
.#..#....#
#..#.#....
#....###..
...###...#
.#.#.#....
##..#....#
#..#.#..#.

Tile 2551:
###.#....#
.....##...
.#.......#
..###..###
#.#...#..#
#......#.#
.#..###...
.......#..
#.#..#...#
###...##.#

Tile 1637:
###.##...#
..#..#....
..###.##..
#........#
#.#......#
......####
#....#.###
#.###.....
.#.#.....#
##.##.####

Tile 2281:
#####..#..
.##.#..###
#..#.##...
.#.#.#....
#.#.#...##
..##.##...
.....##..#
..#..##...
##..#..#.#
##....#..#

Tile 3559:
##.#.#.#.#
.....#.#..
#....#...#
....#.....
###....#.#
..........
##..#....#
.....###.#
#.........
...#......

Tile 3511:
.##.####..
#.........
##.....#..
#......##.
##.....#.#
#.....#.##
.#..#.....
#...#.#..#
#..#.#.#..
.###.#.###

Tile 2063:
.....#.###
##.#...#.#
#....##..#
...#.#...#
#.#.#....#
.#........
..#..###.#
#...###...
.#....##..
..#.###.##

Tile 3187:
......##..
.#....#...
...#.####.
.##.#...#.
#........#
.#...#..##
.#....#...
#..#####.#
....##..#.
#..##.#..#

Tile 3407:
#.###...##
.#........
..##..#..#
.##.#...##
.....#.###
#.#....#.#
.#..#.#...
.#.#..#..#
#..#.#.#.#
...#.#.###

Tile 1597:
.#..#..#..
..#.......
.#.###.#..
##..#...#.
.........#
#.##..##..
....#.....
.#..#...##
#.....#.##
###....#.#

Tile 2087:
#.#..##.##
.##......#
.......#.#
.....#..##
#..#.....#
.#.......#
......#.##
.##....#.#
.......#..
#.#.###.##

Tile 2749:
#####..#.#
#..#...###
...#.#...#
#......#..
##.......#
.#.......#
.#.......#
#..#..#...
.###..#.##
.##.....#.

Tile 1697:
.##.###...
.##..#...#
##....#..#
#....#..#.
.........#
...#..##.#
#....#....
#....##...
..#.##.#..
##....##..

Tile 2711:
##.##.##..
.#..#....#
.#...#....
...#.#....
.##.....#.
##.#..#...
..#...####
##...##.##
.......##.
..#....###

Tile 2521:
.##......#
....##....
.........#
#.##..#...
..........
..#.......
.#........
...#..#...
.......#..
##....#.##

Tile 3163:
.##.#.....
#.........
#........#
#...##.#.#
.#........
.#.#......
........#.
#......###
###.#..#..
###.####.#

Tile 3343:
.#..######
#######..#
...#...#.#
#..#.#...#
.#..##..#.
#...#..#.#
..........
#.###...#.
#..#...##.
#.#.##..#.

Tile 1303:
...#.####.
#..#......
###.#....#
.#.#.....#
.#..#....#
..#.....##
.......#.#
..#..#..##
##..#.##.#
#..#....#.

Tile 3491:
#..##..#..
#.#....##.
#...#..#..
#.#.#.#...
.###.#...#
#....#....
...#..#..#
.#..##.#.#
#.#....###
##...#...#

Tile 3767:
.##..#.#..
#..#....#.
......#...
...#.#..#.
##......##
..#....#..
......##..
#..#....#.
..........
..#..#.#.#

Tile 1823:
...#.##.#.
....#.....
.###......
...#.#....
#..#..#...
#..#.#..##
#...#.....
.#..#....#
..###.#...
.#..#.#.#.

Tile 3863:
.#####.#.#
#.##.#####
...#.#....
..#.#.#..#
#........#
#..#.##...
...##....#
###..##.##
#....#.#..
...#.#####

Tile 1867:
..#.#...#.
##.####...
..........
##.#..#...
..#....#.#
#....#.##.
#..##..#.#
....##..##
...#......
#....##.#.

Tile 2341:
#.#....#..
#........#
..#.....##
.....#.###
....#.#.#.
#..#..##.#
#..##....#
..#..#..#.
#.......##
#.##.####.

Tile 2411:
.#..##....
##.##..#.#
##..#.#...
##...#..##
....#....#
#..#..#...
.....##..#
....#..#..
..#.#..#.#
..##...###

Tile 1523:
...#.##.#.
.#.##....#
#..##.#..#
.#...#....
#......###
#..#......
#.#.#.....
##..##....
..........
.#.##..##.

Tile 2609:
###...####
##...##..#
.#.#.#.##.
.#...##...
##..####.#
...##.##.#
..#...##..
......#..#
#.#..#...#
..##...##.

Tile 2287:
#######.##
#....##.#.
.#..#..#.#
#..##....#
#....####.
....##....
##..##..#.
#..##.....
..##.....#
#..##.##.#

Tile 1049:
#.##......
...#..#..#
.#....###.
###.####..
.......#.#
..#..#..#.
.......#..
.##...#...
....#..##.
.#####...#

Tile 1187:
###....##.
.##.#.#..#
..#.......
##..##.#..
####..#.##
..........
..#.......
.........#
##.#......
...#####.#

Tile 2707:
##.###..##
....###..#
#.##.#....
...#.##.#.
.##..#....
...#..##..
......#..#
...#.#.#..
.......#..
.###.#.#..

Tile 2441:
#.#...#.#.
.####...#.
#.#.......
.....#....
#..#...#.#
...#....##
##.....#..
#..##.....
#..#....#.
.#.##....#

Tile 3571:
.#.###...#
...#.#...#
###...##..
#..###.#..
#..#...#..
....#.##..
#...#.#..#
#..##.....
#.#.....#.
##..#.#.##

Tile 2969:
.######...
#.#...#..#
....#....#
...#..##..
#..####...
...#.#...#
#..##..#.#
..#.......
#..#.##...
.#.##.##.#

Tile 2699:
#..###..#.
.#.#......
..#..#.#..
.....###..
.........#
..##.##..#
.....#...#
#.#..##...
#...#...##
###..#..##

Tile 1759:
#......###
.........#
#...###..#
###......#
####....#.
..........
.......#..
.#.....#.#
#.#.....#.
...##.###.

Tile 2843:
..#.###.##
.....#...#
..#......#
#..#..#...
...###.#..
..##..#..#
...#..#...
#....#..##
#.#.#.#..#
####......

Tile 1063:
...#.#.#.#
.#.##.....
##...#..##
#.#.###..#
.#..#..#.#
...####..#
#.###..#.#
..#..#....
####....##
...##.....

Tile 2161:
.#.#..#..#
...#..#.##
.#..##.#..
#........#
..#.......
#......#..
.##.....##
.#.#.##...
.#.###...#
#.#.#.#.#.

Tile 1543:
#..##.##..
#...#.....
#..###..##
#....#..##
####......
###.......
.#........
##.#......
##....#...
..#.####.#

Tile 1979:
..#.#....#
#..##.....
.#.##....#
##........
....#.#..#
#...#.....
#......#.#
#...#....#
.#..#....#
#..###.#..

Tile 1607:
#..##.....
#.......##
#..#.##.#.
.......###
.#..##....
....##..##
##..#.....
#....#.###
.........#
.#...####.

Tile 2957:
#####...##
#.#...#.##
##....###.
..........
#.......#.
...#...##.
.......###
##..##.#.#
.#..###.#.
.#.###..##

Tile 3221:
..#.#.....
.#...#.#.#
....##..##
#..##...##
..........
.#........
..#.......
#..#.....#
...##.#.##
...####..#

Tile 1213:
#...#.####
.........#
#.##..#..#
..#...#...
##.##....#
.....#....
.........#
#...##..##
#.......##
####..#.#.

Tile 3023:
##..#..###
..###.#.#.
##.#......
.....#...#
..#..#..#.
##........
##.#.#.#..
...####.##
.....#....
#.##....#.

Tile 1489:
.###..#...
#........#
##...#.#..
##..##..#.
....#....#
.....##.#.
#...######
#....#...#
...#.###..
#.#.#.#.##

Tile 1601:
..#...##.#
........#.
#...#....#
#....#....
###.#.#..#
...#####.#
...####.#.
#....##...
.#...#...#
...#.#.#.#

Tile 2953:
#.#...###.
#..#...#..
.........#
#.#.#....#
#..##.#..#
#..#......
##.#..#.##
#.#..#..#.
.........#
...##...#.

Tile 1481:
......#...
......#.#.
#........#
..........
#..##....#
.#..#...##
.##.....#.
##..#.#...
#......#..
##..###.##

Tile 1531:
..#.#...#.
.....##...
.#....#.#.
..#....#..
#.#.###...
#....###..
........#.
#....#.#..
##.#......
#...###..#

Tile 1039:
##.#..#...
#.#...#...
#.#.#...##
.#.#.##..#
##...##..#
##..##..#.
#.........
#.#.#..#..
.#..#..#..
.##......#

Tile 2549:
.##.####.#
#..#...#..
#..#..#.#.
...##.#..#
#..##.#..#
##.#.#.###
...##..#.#
......####
..##.#..#.
######.#..

Tile 1913:
..#....#.#
#....##..#
#.#....#..
...##.....
.....#.###
....#..#..
##...#.#..
..#...#...
#...#...#.
.##..###.#

Tile 1831:
..#.....##
##.#..##.#
....###.##
#.........
####.#..#.
###..#..#.
#..##....#
#.......##
....##...#
##.##.#..#

Tile 2099:
...##.##.#
..#.....##
.....#...#
..#..#..##
.#####..#.
.....#...#
..#.....#.
.....#...#
.#...#...#
#.#..#....

Tile 3209:
####..#...
....#....#
....#.#..#
....##...#
....#.....
.#.....#..
.###...#..
...#....##
#.#......#
..#.#..##.

Tile 2593:
#.####.#..
###...####
#.......#.
##.##...#.
#.....#.#.
...#...#.#
#.#.#....#
###....###
#...#....#
.###..####

Tile 3011:
#.#.####.#
##.#....##
##.......#
.##.#.....
.#....###.
.##...##..
.#...#.#.#
##...#..#.
#.#....#..
.#..#.#.##

Tile 2371:
##.#####..
#........#
#.#...#...
##...#.###
#.......##
...#....#.
#.#......#
..####.###
#...#..#.#
##.##...#.

Tile 3853:
###.#.#.##
.........#
#..#.#.#..
#........#
#...##...#
##...###.#
.#.###....
...##....#
##..#.##.#
##..#.#.#.

Tile 3821:
..#.##...#
#.##....#.
.#.#####.#
#.#..#.#.#
..###....#
...###...#
##.......#
.##..#..#.
###......#
#...#..###

Tile 2591:
##...#..##
#.##.#..#.
#..###...#
....#...##
#.......#.
....##...#
...#.##...
.##....###
......#..#
#.#..#.#.#

Tile 3041:
#.###..#.#
...#......
...##.#..#
.....##.#.
.#..#..##.
....#....#
#.#.......
...#####.#
#..##..##.
#.###...#.

Tile 1667:
####...#..
..........
..........
#.#..##...
..#..#....
..#...#..#
......##.#
#.#....##.
.....#...#
..########

Tile 2003:
..##..#.##
###.#..#.#
...#....##
.........#
#........#
.#......##
##..##.#.#
##..#..#.#
..#....###
#...#.#...

Tile 1447:
#####....#
..#......#
#......#.#
#..#.....#
#..#.####.
#....#.#..
#..####...
#....##...
#.#.......
.###..##..

Tile 2333:
##.##.###.
#....#..##
#....#....
#.#.......
..........
....#....#
#..#...###
...#.....#
#..##.#..#
###...#.#.

Tile 1571:
.....##.#.
......##.#
..#......#
..........
#.....#...
#..#..#...
#.#...#...
....##....
#..#..##..
#....##...

Tile 1181:
..#...##..
##.......#
#..##.#...
###...#.#.
#.#..#.#..
###....##.
.....#....
##..#.....
.....#..#.
#...#.##.#

Tile 1117:
###.#...#.
#.........
...#....#.
#..##..###
##....#.##
.....##..#
....##..##
.#.###...#
#.#.......
.##...#.#.

Tile 3623:
#..#######
#....###..
.#....#...
#....#.##.
..#.......
#..######.
#.........
#...#.##.#
....#...#.
#####.###.

Tile 2111:
##.#..#..#
#..#..##..
#..####...
#......#.#
#...##...#
......#.#.
..........
....#.#.#.
..........
.###......

Tile 2579:
.....#..#.
#.#.....#.
#..#.....#
#........#
....#..#..
......##.#
..##.#.#.#
...#..####
.#........
#.##......

Tile 2477:
.#..######
.#........
..#......#
#...##...#
...#.....#
#..##.#..#
..#.#....#
##.#.....#
.#.#......
.##...##..

Tile 1621:
.#.##.####
#........#
....#.#.##
#...#.#..#
.........#
.#....#..#
....#....#
#......#.#
..##....#.
##.##.##..

Tile 2297:
.#..##.#..
...#....##
....###..#
#..#...##.
#.##......
.###......
#.......##
......#...
.#....#.#.
#......#..

Tile 2237:
##.#.#.###
#..#....#.
.#..##...#
..#..##...
.......#..
......##.#
...#..#...
.....###.#
#....#....
.##.#.####

Tile 1097:
##.#...#..
..#...#...
#..##.....
.#....#..#
...##....#
..#.###.#.
......#..#
#..#..##..
#..##.#...
.#.#..##..

Tile 3037:
###.##.#..
##..#..#.#
#........#
..#.....##
....#.....
...#.#..#.
#.##.....#
..........
.##....#.#
.#.#.#...#

Tile 2617:
##....###.
##.#...#.#
........#.
.......#..
#....#....
...#....##
......#.##
..####...#
.#...#..##
.##..##..#

Tile 2273:
...#.###.#
#.##.#..##
.....#...#
.#.#....##
#.....#..#
#.#......#
...#.#....
...##..###
##.....#.#
##....###.

Tile 1321:
.##..#####
#........#
#....#...#
...#...#..
.....#....
#.#...#..#
#......#..
##..#.#..#
.##....#.#
#.####.#.#

Tile 3299:
##....#.##
..........
#.#.#.#..#
..#......#
...#......
....#....#
#.......##
...#.....#
...#...#.#
.#...##...

Tile 2467:
#.#......#
#.....#..#
##.###.#..
..#..##..#
.#..#....#
.#..#...#.
..#....#..
.#....#...
#.#..#...#
#..#####.#

Tile 3313:
#.##.....#
#....#.#..
.........#
#.#.##.#..
##...#.#..
#..#..##..
#.....##.#
##...##...
#...##.###
#...#.##.#

Tile 2677:
..##.#.##.
.........#
..#...#.##
..#..###..
##.....###
..#......#
..#.#.#..#
.###....##
#..##.##..
...#.##.##

Tile 2207:
.####.####
##..#.....
#.#..#.#..
#.##.#..##
#...#.#..#
.#.....#.#
......#..#
....##..##
.....#....
...##..##.

Tile 3769:
###.##..#.
##...#....
#.........
#...#..##.
.#...#.#..
..###....#
.........#
#...##...#
###.#.#.#.
.##..##...`;

console.log(calculateWaterRoughnessByImage(input));