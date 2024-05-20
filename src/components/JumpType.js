export const JumpType = {
    Belly: 'Belly',
    Freefly: 'Freefly',
    Wingsuit: 'Wingsuit',
    HighPull: 'High Pull',
    Tandem: 'Tandem',
    AFF: 'AFF',
    CRW: 'CRW',
    XRW: 'XRW',
    NONE: 'N/A'
}

export const EnumToJumpType = (value) => {
    const enumToJumpType = {
        0: JumpType.Belly,
        1: JumpType.Freefly,
        2: JumpType.Wingsuit,
        3: JumpType.HighPull,
        4: JumpType.Tandem,
        5: JumpType.AFF,
        6: JumpType.CRW,
        7: JumpType.XRW,
    }
    return enumToJumpType[value] || null
}

export const JumpTypeToEnum = (value) => {
    const jumpTypeToEnum = {
        [JumpType.Belly]: 0,
        [JumpType.Freefly]: 1,
        [JumpType.Wingsuit]: 2,
        [JumpType.HighPull]: 3,
        [JumpType.Tandem]: 4,
        [JumpType.AFF]: 5,
        [JumpType.CRW]: 6,
        [JumpType.XRW]: 7,
    }
}
