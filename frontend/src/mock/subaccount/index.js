export default {
    statusChange: {
        status: 200,
        data: 'Status Changed successfully'
    },
    addOrUpdateSubaccount: {
        status: 200,
        data: 'successfully Added/Updated'
    },
    getUsername: {
        data: {
            status: 200,
            data: 'User1234'
        }
    },
    fetchSubAccountDetails: {
        status: 200,
        data: {
            id: '3',
            name: 'Akash',
            refTag: '#232321',
            trafficType: 'Pandey',
            telecomOperator: '',
            accountType: 'OTP',
            protocolType: 'SMPP',
            username: 'Akash ',
            password: '1386532645',
            tpsAllocation: 50,
            sessionType: '23232',
            bindsNo: 1,
            retryManagement: true,
            subPartnerType: 'default',
            errorCodes: [],
            retriesNumber: '',
            timeInterval: '',
            retryRoutes: ''
        }
    },
    fetchList: {
        status: 200,
        data: [
            { id: '1', name: 'BSNL', bind_session: 'trx', tps: 32, protocol: 'http' , max_binds: 3, account_type: 'promo', retry: false, time_epoch: '22-10-1200' },
            { id: '2', name: 'BSNL2', bind_session: 'tx', tps: 32, protocol: 'http' , max_binds: 3, account_type: 'promo', retry: false, time_epoch: '22-10-1200' },
            { id: '3', name: 'BSNL3', bind_session: 'rx', tps: 32, protocol: 'smpp' , max_binds: 3, account_type: 'promo', retry: false, time_epoch: '22-10-1200' },
            { id: '4', name: 'BSNL4', bind_session: 'trx', tps: 32, protocol: 'http' , max_binds: 3, account_type: 'promo', retry: false, time_epoch: '22-10-1200' },
            { id: '5', name: 'BSNL5', bind_session: 'trx', tps: 32, protocol: 'smpp' , max_binds: 3, account_type: 'promo', retry: false, time_epoch: '22-10-1200' },
            { id: '6', name: 'BSNL6', bind_session: 'trx', tps: 32, protocol: 'http' , max_binds: 3, account_type: 'promo', retry: false, time_epoch: '22-10-1200' }
        ]
    }
}
