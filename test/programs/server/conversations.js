'use strict'

const conversations = require('../../../programs/server/conversations')

describe('extractClassificationsFrom', () => {
  const classification = (baseType, subType, style) => {
    return {
      base_type: {
        value: baseType,
      },
      sub_type: {
        value: subType,
      },
      style: {
        value: style,
      },
    }
  }

  it('extracts classifications from a conversation', () => {
    const conversation = {
      messages: [{
        parts: [{
          classifications: [
            classification('a', 'b', 'c'),
            classification('1', '2', '3'),
          ],
        }, {
          classifications: [
            classification('x', 'y', 'z'),
            classification('7', '8', '9'),
          ],
        }],
      }, {
        parts: [{
          classifications: [
            classification('a', 'b', 'c'),
            classification('q', 'r', 's'),
            classification('x', 'y', 'z'),
          ],
        }],
      }],
    }

    const result = conversations.extractClassificationsFrom([conversation])

    expect(result.length).to.equal(5)
    expect(result).to.deep.have.members([
      classification('1', '2', '3'),
      classification('7', '8', '9'),
      classification('a', 'b', 'c'),
      classification('q', 'r', 's'),
      classification('x', 'y', 'z'),
    ])
  })
})

describe('extractSlotsFrom', () => {
  const slot = (baseType, entity, role) => {
    return {
      base_type: baseType,
      entity: entity,
      role: role,
    }
  }

  it('extracts slots from a conversation', () => {
    const conversation = {
      messages: [{
        parts: [{
          slots: {
            'a/b': {
              base_type: 'a',
              entity: 'b',
              roles: [
                'c0',
                'c1',
                'c2',
              ],
            },
            '1/2': {
              base_type: '1',
              entity: '2',
              roles: [
                '30',
                '31',
                '32',
              ],
            },
          },
        }, {
          slots: {
            'x/y': {
              base_type: 'x',
              entity: 'y',
              roles: [
                'z0',
                'z1',
                'z2',
              ],
            },
            '7/8': {
              base_type: '7',
              entity: '8',
              roles: [
                '90',
                '91',
                '92',
              ],
            },
          },
        }],
      }, {
        parts: [{
          slots: {
            'a/b': {
              base_type: 'a',
              entity: 'b',
              roles: [
                'c0',
                'c1',
                'c2',
              ],
            },
            'q/r': {
              base_type: 'q',
              entity: 'r',
              roles: [
                's0',
                's1',
                's2',
              ],
            },
            'x/y': {
              base_type: 'x',
              entity: 'y',
              roles: [
                'z0',
                'z1',
                'z2',
              ],
            },
          },
        }],
      }],
    }

    const result = conversations.extractSlotsFrom([conversation])

    expect(result.length).to.equal(15)
    expect(result).to.deep.have.members([
      slot('1', '2', '30'),
      slot('1', '2', '31'),
      slot('1', '2', '32'),
      slot('7', '8', '90'),
      slot('7', '8', '91'),
      slot('7', '8', '92'),
      slot('a', 'b', 'c0'),
      slot('a', 'b', 'c1'),
      slot('a', 'b', 'c2'),
      slot('q', 'r', 's0'),
      slot('q', 'r', 's1'),
      slot('q', 'r', 's2'),
      slot('x', 'y', 'z0'),
      slot('x', 'y', 'z1'),
      slot('x', 'y', 'z2'),
    ])
  })
})
