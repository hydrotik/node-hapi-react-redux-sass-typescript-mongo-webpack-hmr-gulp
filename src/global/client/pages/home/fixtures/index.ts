export const fixture: any = {
    name: 'Contemporary',
    description: 'Contemporary description content',
    tags: 'Contemporary,Shoes',
    slides: [{
            id: 0,
            title: 'Slide 1',
            description: 'Lorem ipsum 1',
            src: 'http://c2.staticflickr.com/4/3726/19098533125_d38c33cc4d_k.jpg',
            href: 'https://www.google.com/#q=1'
        }, {
            id: 1,
            title: 'Slide 2',
            description: 'Lorem ipsum 2',
            src: 'https://s.yimg.com/uy/build/images/sohp/hero/lax-den3.jpg',
            href: 'https://www.google.com/#q=2'
        }, {
            id: 2,
            title: 'Slide 3',
            description: 'Lorem ipsum 3',
            src: 'https://s.yimg.com/uy/build/images/sohp/inspiration/lucas-at-pipe3.jpg',
            href: 'https://www.google.com/#q=3'
        }, {
            id: 3,
            title: 'Slide 4',
            description: 'Lorem ipsum 4',
            src: 'https://s.yimg.com/uy/build/images/sohp/inspiration/love-rock3.jpg',
            href: 'https://www.google.com/#q=4'
        }, {
            id: 4,
            title: 'Slide 5',
            description: 'Lorem ipsum 5',
            src: 'http://c2.staticflickr.com/4/3726/19098533125_d38c33cc4d_k.jpg',
            href: 'https://www.google.com/#q=5'
        }],
    grid: {
        children: []
    },
    /* Temp - move final nested hiearchy to above grid */
    editorial: [
        [ // <--RowContainer
            [ // <--ColumnContainer
                { // <--ContentContainer
                    type: 'full',
                    position: 'left',
                    target: '_blank',
                    id: 0,
                    // title: 'Slide 1',
                    description: 'Editorial 1',
                    // src: 'http://c2.staticflickr.com/4/3726/19098533125_d38c33cc4d_k.jpg',
                    href: 'https://www.google.com/#q=1',

                    images: [
                        { src: '//farm1.staticflickr.com/485/20356020016_4a5b357270_c.jpg', width: '600w' },
                        { src: '//farm1.staticflickr.com/485/20356020016_f9c816c270_h.jpg', width: '800w' },
                        { src: '//farm1.staticflickr.com/485/20356020016_e3e67db2ad_k.jpg', width: '1000w' }
                    ]
                }
            ]
        ],
        [ // <--RowContainer
            [ // <--ColumnContainer
                { // <--ContentContainer
                    type: 'column',
                    position: 'center',
                    target: '_blank',
                    id: 0,
                    // title: 'Slide 1',
                    description: 'Left Coumn Row 1 - Lorem ipsum here in the descripsum to explain sum.',
                    // src: 'http://c2.staticflickr.com/4/3726/19098533125_d38c33cc4d_k.jpg',
                    href: 'https://www.google.com/#q=1',

                    images: [
                        { src: '//farm3.staticflickr.com/2646/4092034117_203c35f9fa.jpg', width: '600w' },
                        { src: '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_z.jpg', width: '800w' },
                        { src: '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_b.jpg', width: '1000w' }
                    ]
                },
                { // <--ContentContainer
                    type: 'column',
                    position: 'center',
                    target: '_blank',
                    id: 0,
                    // title: 'Slide 1',
                    description: 'Left Column Row 2 - Lorem ipsum here in the descripsum to explain sum.',
                    // src: 'http://c2.staticflickr.com/4/3726/19098533125_d38c33cc4d_k.jpg',
                    href: 'https://www.google.com/#q=1',

                    images: [
                        { src: '//farm3.staticflickr.com/2646/4092034117_203c35f9fa.jpg', width: '600w' },
                        { src: '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_z.jpg', width: '800w' },
                        { src: '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_b.jpg', width: '1000w' }
                    ]
                }
            ],
            [ // <--ColumnContainer
                { // <--ContentContainer
                    type: 'column',
                    position: 'center',
                    target: '_blank',
                    id: 0,
                    // title: 'Slide 1',
                    description: 'Right Column Row 1 and 2 - Lorem ipsum here in the descripsum to explain sum.',
                    // src: 'http://c2.staticflickr.com/4/3726/19098533125_d38c33cc4d_k.jpg',
                    href: 'https://www.google.com/#q=1',

                    images: [
                        { src: '//farm9.staticflickr.com/8301/7794118424_1330cf491d.jpg', width: '600w' },
                        { src: '//farm9.staticflickr.com/8301/7794118424_1330cf491d_c.jpg', width: '800w' },
                        { src: '//farm9.staticflickr.com/8301/7794118424_1330cf491d_b.jpg', width: '1000w' }
                    ]
                }
            ]
        ]
    ]
};
