export default {
    save: {
        status: 200,
        data: 'successfully Added/Updated'
    },
    statusChange: {
        data: {
            status: 200,
            data: 'successfully Updated'
        }
    },
    fetchDetails: {
        status: 200,
        data: {
            name: 'test test ',
            routerType: 'lcr',
            country: {'code': 'IN','label': 'India'},
            subAccounts: '',
            mobileOperators: [],
            senderIDs: '',
            mobileOperator: [],
            partners: [],
            partnersList: [],
            routingLogic: [],
        }
    },
    fetchList: {
        'count': 6,
        'next': 'http://202.174.123.188:8000/portal/route/enterprise/summary/?limit=10&name__icontains=&offset=10&page=1',
        'previous': null,
        'results': [
            {
                'account': {
                    'id': 6,
                    'name': 'subaccount HTTP'
                },
                'source': '123123123',
                'operator_group': {
                    'id': 50,
                    'name': 'Etisalat UAE'
                },
                'routing_logic': 'quota',
                'queues': [],
                'aggregators': [
                    {
                        'id': 2,
                        'name': 'GUPSHUP'
                    }
                ],
                'name': 'route gupshup',
                'enabled': false,
                'country': 'AE',
                'date_created': 1628861659,
                'trafficType': 'NLD',
            },
            {
                'account': {
                    'id': 6,
                    'name': 'subaccount HTTP'
                },
                'source': null,
                'operator_group': {
                    'id': 52,
                    'name': 'Vodafone'
                },
                'routing_logic': 'quota',
                'queues': [
                    {
                        'location': 'test',
                        'topic': 'test',
                        'active': true,
                        'smpp_account': {
                            'id': 4,
                            'name': 'connect one',
                            'telco': {
                                'id': 2,
                                'name': 'AIRCEL'
                            }
                        }
                    }
                ],
                'aggregators': [],
                'name': 'route1',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'NLD',
            },
            {
                'account': {
                    'id': 6,
                    'name': 'subaccount HTTP'
                },
                'source': null,
                'operator_group': {
                    'id': 4,
                    'name': 'Reliance Jio'
                },
                'routing_logic': 'quota',
                'queues': [],
                'aggregators': [
                    {
                        'id': 2,
                        'name': 'GUPSHUP'
                    },
                    {
                        'id': 3,
                        'name': 'DIALOGFLOW'
                    }
                ],
                'name': 'route rel',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'ILD',
            },
            {
                'account': {
                    'id': 6,
                    'name': 'subaccount HTTP'
                },
                'source': null,
                'operator_group': {
                    'id': 2,
                    'name': 'Airtel'
                },
                'routing_logic': 'lcr',
                'queues': [
                    {
                        'location': 'test',
                        'topic': 'test',
                        'active': true,
                        'smpp_account': {
                            'id': 4,
                            'name': 'connect one',
                            'telco': {
                                'id': 2,
                                'name': 'AIRCEL'
                            }
                        }
                    }
                ],
                'aggregators': [
                    {
                        'id': 3,
                        'name': 'DIALOGFLOW'
                    }
                ],
                'name': 'subaccount Airtel',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'NLD',
            },
            {
                'account': {
                    'id': 6,
                    'name': 'subaccount HTTP'
                },
                'source': null,
                'operator_group': {
                    'id': 1,
                    'name': 'Vodafone Idea'
                },
                'routing_logic': 'quota',
                'queues': [
                    {
                        'location': 'test',
                        'topic': 'test',
                        'active': true,
                        'smpp_account': {
                            'id': 4,
                            'name': 'connect one',
                            'telco': {
                                'id': 2,
                                'name': 'AIRCEL'
                            }
                        }
                    }
                ],
                'aggregators': [],
                'name': 'route1',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'ILD',
            },
            {
                'account': {
                    'id': 53,
                    'name': 'test sub acc 8'
                },
                'source': null,
                'operator_group': {
                    'id': 52,
                    'name': 'Vodafone'
                },
                'routing_logic': 'quota',
                'queues': [],
                'aggregators': [
                    {
                        'id': 3,
                        'name': 'DIALOGFLOW'
                    }
                ],
                'name': 'vodafone',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'ILD',
            },
            {
                'account': {
                    'id': 53,
                    'name': 'test sub acc 8'
                },
                'source': null,
                'operator_group': {
                    'id': 1,
                    'name': 'Vodafone Idea'
                },
                'routing_logic': 'quota',
                'queues': [],
                'aggregators': [
                    {
                        'id': 3,
                        'name': 'DIALOGFLOW'
                    }
                ],
                'name': 'vodafone',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'NLD',
            },
            {
                'account': {
                    'id': 56,
                    'name': 'test subaccont 04 1'
                },
                'source': null,
                'operator_group': {
                    'id': 2,
                    'name': 'Airtel'
                },
                'routing_logic': 'quota',
                'queues': [],
                'aggregators': [
                    {
                        'id': 3,
                        'name': 'DIALOGFLOW'
                    }
                ],
                'name': 'j test 04052020',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597395726,
                'trafficType': 'NLD',
            },
            {
                'account': {
                    'id': 65,
                    'name': 'sampleusssr'
                },
                'source': null,
                'operator_group': {
                    'id': 5,
                    'name': 'Tata Docomo'
                },
                'routing_logic': 'lcr',
                'queues': [
                    {
                        'location': 'lock',
                        'topic': 'test',
                        'active': true,
                        'smpp_account': {
                            'id': 24,
                            'name': 'connect qa',
                            'telco': {
                                'id': 4,
                                'name': 'AIRCEL'
                            }
                        }
                    },
                    {
                        'location': 'two',
                        'topic': 'one',
                        'active': true,
                        'smpp_account': {
                            'id': 40,
                            'name': 'test connn',
                            'telco': {
                                'id': 1,
                                'name': 'AIRCEL'
                            }
                        }
                    },
                    {
                        'location': 'three',
                        'topic': 'three',
                        'active': true,
                        'smpp_account': {
                            'id': 47,
                            'name': 'connect july',
                            'telco': {
                                'id': 6,
                                'name': 'AIRCEL'
                            }
                        }
                    },
                    {
                        'location': 'four',
                        'topic': 'four',
                        'active': true,
                        'smpp_account': {
                            'id': 51,
                            'name': 'tconnxxrt',
                            'telco': {
                                'id': 3,
                                'name': 'TATA DOCOMO'
                            }
                        }
                    }
                ],
                'aggregators': [],
                'name': 'onetest',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597409871,
                'trafficType': 'NLD',
            },
            {
                'account': {
                    'id': 65,
                    'name': 'sampleusssr'
                },
                'source': null,
                'operator_group': {
                    'id': 2,
                    'name': 'Airtel'
                },
                'routing_logic': 'quota',
                'queues': [
                    {
                        'location': 'four',
                        'topic': 'four',
                        'active': true,
                        'smpp_account': {
                            'id': 51,
                            'name': 'tconnxxrt',
                            'telco': {
                                'id': 3,
                                'name': 'TATA DOCOMO'
                            }
                        }
                    }
                ],
                'aggregators': [
                    {
                        'id': 2,
                        'name': 'GUPSHUP'
                    }
                ],
                'name': 'naviroute',
                'enabled': true,
                'country': 'IN',
                'date_created': 1597410514,
                'trafficType': 'NLD',
            }
        ]
    },
    filterResult: {
        status: 200,
        data: {
            'count': 2,
            'next': null,
            'previous': null,
            'results': [
                {
                    'account': null,
                    'source': null,
                    'operators': [
                        {
                            'id': 3,
                            'name': 'Airtel-Kar'
                        },
                        {
                            'id': 1,
                            'name': 'Airtel-ncr'
                        }
                    ],
                    'operator_group': {
                        'id': 1,
                        'name': 'Airtel'
                    },
                    'route_type': 'tel',
                    'queue': {
                        'location': 'localhost',
                        'topic': 'test',
                        'active': true,
                        'smpp_account': {
                            'id': 1,
                            'name': 'smpp1',
                            'telco': {
                                'id': 1,
                                'name': 'tel1'
                            }
                        }
                    },
                    'aggregator': null,
                    'weight': 1,
                    'cost': '10.00000000',
                    'quota': 2
                },
                {
                    'account': null,
                    'source': null,
                    'operators': [
                        {
                            'id': 3,
                            'name': 'Airtel-Kar'
                        },
                        {
                            'id': 1,
                            'name': 'Airtel-ncr'
                        }
                    ],
                    'operator_group': {
                        'id': 1,
                        'name': 'Airtel'
                    },
                    'route_type': 'tel',
                    'queue': {
                        'location': 'kdvjnsv',
                        'topic': 'tesss',
                        'active': true,
                        'smpp_account': {
                            'id': 2,
                            'name': 'smpp2',
                            'telco': {
                                'id': 2,
                                'name': 'tel2'
                            }
                        }
                    },
                    'aggregator': null,
                    'weight': 1,
                    'cost': '10.00000000',
                    'quota': 1
                }
            ]
        }
    }
}
