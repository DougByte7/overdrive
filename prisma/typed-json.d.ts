declare global {
    namespace PrismaJson {
        type SRDTrait = {
            name: string
            value: string
        }

        type SRDEquipmentOptions = [
            [
                [
                    {
                        item: string
                        amount: number
                    },
                ],
            ],
        ]

        type SRDFeature = {
            name: string
            description: string
            level: number[]
        }
    }
}
