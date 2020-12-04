var db = {
    manufacturers: [
        {
            label: 'Opel',
            pkManufacturer: 1,
            models: [
                {
                    label: 'Astra',
                    pkModel: 1,
                    parts: [
                        {
                            label: 'Set zupčastog remena',
                            pkPart: 1,
                            details: 'Komplet set zupčastog remena\nUključuje vodenu pumpu, remen i natezače remena',
                            price: '799',
                            year: '1991-2001',
                        },
                        {
                            label: 'Letva volana',
                            pkPart: 2,
                            details: 'Odgovara na sve Astre F: kabrio, karavan, sedan',
                            price: '834',
                            year: '1991-2001',
                        }
                    ]
                },
                {
                    label: 'Vectra',
                    pkModel: 2,
                    parts: [
                        {
                            label: 'Prednje maglenke',
                            pkPart: 3,
                            details: '',
                            price: '100',
                            year: '1991-1998',
                        }
                    ]
                }
            ]
        },
        {
            label: 'BMW',
            pkManufacturer: 2,
            models: [
                {
                    label: 'E30',
                    pkModel: 3,
                    parts: [
                        {
                            label: 'Zadnja leptir stakla LD',
                            pkPart: 4,
                            details: 'Leptir stakla za coupe varijantu, dolaze u paru',
                            price: '2846',
                            year: '1960-1960',

                        }
                    ]
                },
                {
                    label: 'E46',
                    pkModel: 4,
                    parts: [
                        {
                            label: 'Kiler 328i',
                            pkPart: 5,
                            details: 'Kiler za varijantu 328i, veći nego original\nManje će prokuvat',
                            price: '2749',
                            year: '2002-2009',
                        }
                    ]
                }
            ]
        },
        {
            label: 'Volkswagen',
            pkManufacturer: 3,
            models: [
                {
                    label: 'Golf',
                    pkModel: 5,
                    parts: [
                        {
                            label: 'Servo pumpa Golf 3',
                            pkPart: 6,
                            details: 'Servo pumpa za Golf 3, električna',
                            price: '974',
                            year: '1994-2001',
                        }
                    ]
                },
                {
                    label: 'Tiguan',
                    pkModel: 6,
                    parts: [
                        {
                            label: 'DSG',
                            pkPart: 7,
                            details: 'DSG sustav mjenjača',
                            price: '5862',
                            year: '2007-2014',
                        }
                    ]
                }
            ]
        },
        {
            label: 'Mazda',
            pkManufacturer: 4,
            models: [
                {
                    label: '323F',
                    pkModel: 7,
                    parts: []
                },
                {
                    label: 'RX-8',
                    pkModel: 8,
                    parts: [
                        {
                            label: 'Wankel motor (rotary) 1.3',
                            pkPart: 8,
                            details: 'Rotary motor 1.3, street port',
                            price: '14795',
                            year: '2004-2011',
                        }
                    ]
                }
            ]
        }
    ]
}

module.exports = db;