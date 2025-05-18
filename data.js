const products = [
    {
        id: '1',
        name: 'Fender Stratocaster',
        type: 'electric',
        price: 1599,
        image: 'images/electric_guitars/fender_strat.webp',
        description: 'Легендарная электрогитара, которая стала символом рок-музыки.',
        specs: [
            { name: 'Тип', value: 'Электрогитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Ольха' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '2',
        name: 'Gibson Les Paul',
        type: 'electric',
        price: 2095,
        image: 'images/electric_guitars/gibson_les_paul.webp',
        description: 'Классическая гитара с тёплым и насыщенным звучанием.',
        specs: [
            { name: 'Тип', value: 'Электрогитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '24.75"' },
            { name: 'Материал корпуса', value: 'Красное дерево' },
            { name: 'Материал грифа', value: 'Красное дерево' }
        ]
    },
    {
        id: '3',
        name: 'Ibanez RG',
        type: 'electric',
        price: 2399,
        image: 'images/electric_guitars/ibanez_rg420ex_bkf.jpg',
        description: 'Мощная гитара для металла и тяжёлой музыки.',
        specs: [
            { name: 'Тип', value: 'Электрогитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Липа' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '4',
        name: 'Yamaha Pacifica',
        type: 'electric',
        price: 2390,
        image: 'images/electric_guitars/yamaha-pacifica-120-h-vwh-1_jpeg.webp',
        description: 'Отличная гитара для начинающих.',
        specs: [
            { name: 'Тип', value: 'Электрогитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Ольха' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '5',
        name: 'Cort X-3',
        type: 'electric',
        price: 700,
        image: 'images/electric_guitars/cort_x3.webp',
        description: 'Отличная гитара для начинающих.',
        specs: [
            { name: 'Тип', value: 'Электрогитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Ольха' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },

    
    {
        id: '6',
        name: 'Baton Rouge X11S',
        type: 'acoustic',
        price: 899,
        image: 'images/acoustic_guitars/baton-rouge-x11s-sd-bt-1_jpg.webp',
        description: 'Акустическая гитара с ярким звучанием.',
        specs: [
            { name: 'Тип', value: 'Акустическая гитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Ель' },
            { name: 'Материал грифа', value: 'Нато' }
        ]
    },
    {
        id: '7',
        name: 'Yamaha FG800',
        type: 'acoustic',
        price: 1439,
        image: 'images/acoustic_guitars/yamaha-fg-800sbbs_jpg.webp',
        description: 'Отличная акустика из массива акустика с насыщенным звуком.',
        specs: [
            { name: 'Тип', value: 'Акустическая гитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Ель' },
            { name: 'Материал грифа', value: 'Нато' }
        ]
    },
    {
        id: '8',
        name: 'Fender CD-60S',
        type: 'acoustic',
        price: 850,
        image: 'images/acoustic_guitars/fender-cd-60s-natural-1_jpg.webp',
        description: 'Отличный выбор для начинающих гитаристов.',
        specs: [
            { name: 'Тип', value: 'Акустическая гитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '25.5"' },
            { name: 'Материал корпуса', value: 'Красное дерево' },
            { name: 'Материал грифа', value: 'Нато' }
        ]
    },
    {
        id: '9',
        name: 'Taylor GS Mini',
        type: 'acoustic',
        price: 1200,
        image: 'images/acoustic_guitars/taylor-gs-mini-1_jpeg.webp',
        description: 'Компактная гитара с большим звуком.',
        specs: [
            { name: 'Тип', value: 'Акустическая гитара' },
            { name: 'Количество струн', value: '6' },
            { name: 'Мензура', value: '23.5"' },
            { name: 'Материал корпуса', value: 'Красное дерево' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '10',
        name: 'Fender Precision Bass',
        type: 'bass',
        price: 1199,
        image: 'images/bass guitars/fender-squier-affinity-pj-bass-bwb-pg-b-1_jpg.webp',
        description: 'Классическая бас-гитара с мощным звучанием.',
        specs: [
            { name: 'Тип', value: 'Бас-гитара' },
            { name: 'Количество струн', value: '4' },
            { name: 'Мензура', value: '34"' },
            { name: 'Материал корпуса', value: 'Ольха' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '11',
        name: 'Ibanez SR300',
        type: 'bass',
        price: 1100,
        image: 'images/bass guitars/ibanez-sr300eb-wk-1_jpg.webp',
        description: 'Лёгкая и удобная бас-гитара.',
        specs: [
            { name: 'Тип', value: 'Бас-гитара' },
            { name: 'Количество струн', value: '4' },
            { name: 'Мензура', value: '34"' },
            { name: 'Материал корпуса', value: 'Махагони' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '12',
        name: 'Yamaha TRBX174',
        type: 'bass',
        price: 950,
        image: 'images/bass guitars/yamaha-trbx174-bl-1_jpg.webp',
        description: 'Отличная бас-гитара для начинающих.',
        specs: [
            { name: 'Тип', value: 'Бас-гитара' },
            { name: 'Количество струн', value: '4' },
            { name: 'Мензура', value: '34"' },
            { name: 'Материал корпуса', value: 'Липа' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    },
    {
        id: '13',
        name: 'Cort Action V BK',
        type: 'bass',
        price: 659,
        image: 'images/bass guitars/Cort Action V BK.webp',
        description: 'Бюджетный пятиструнный бас.',
        specs: [
            { name: 'Тип', value: 'Бас-гитара' },
            { name: 'Количество струн', value: '5' },
            { name: 'Мензура', value: '34"' },
            { name: 'Материал корпуса', value: 'Агатис' },
            { name: 'Материал грифа', value: 'Клён' }
        ]
    }
];