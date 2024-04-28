<template>
  <body class="background-clr">
    <div class="maincontent">
        <div class=" mt-3 mb-3 col-12">
            <div class="mb-3">
            <DataTable class="p-datatable" :value="filteredItems" :paginator="true" :rows="10"
                dataKey="id" :rowHover="true" :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" autoLayout>
                <template #header>
                    <div class="row">
                        <h5 class="m-0 col-6 text-primary pt-2">Registered Clients</h5>
                        <div class="col-4">
                        <div class="float-right">
                            <span class="p-input-icon-right align-items-center">
                                <i class="pi pi-search" />
                                <InputText placeholder="Search by id | name | CIN | email" v-model="search" @keyup="searchClient" />
                            </span>
                        </div>
                        </div>
                        <div class="col-2">
                            <Button class="create-client" @click="openModal">Create Client</Button>
                        </div>
                    </div>
                </template>
                <template #loading>
                    <div class="text-center">Loading export list. Please wait.</div>
                </template>
                <Column field="id" header="Id">
                    <template #body="{data}">
                        <span>{{data.id}}</span>
                    </template>
                </Column>
                <Column field="name" header="Company Name">
                    <template #body="{data}">
                        <span class="text-primary csr-pnt" @click="openModal(data)">{{(data.name)}}</span>
                    </template>
                </Column>
                <Column field="cin" header="CIN">
                    <template #body="{data}">
                        <span>{{(data.cin)}}</span>
                    </template>
                </Column>
                <Column field="pincode" header="PIN">
                    <template #body="{data}">
                        <span>{{(data.pincode)}}</span>
                    </template>
                </Column>
                <Column field="email" header="Email">
                    <template #body="{data}">
                        <span>{{(data.email)}}</span>
                    </template>
                </Column>
                <Column field="createdAt" header="Created Date" sortable dataType="date">
                    <template #body="{data}">
                        <span>{{formatDate(data.createdAt)}}</span>
                    </template>
                </Column>
                <Column field="action" header="">
                    <template #body="{data}">
                        <Button @click="deleteClient(data.id)" type="button">Delete</Button>
                    </template>
                </Column>
                <!-- <Column field="status">
                    <template #body="{data}">
                        <Button v-if="!downloading.includes(data.id)" :disabled="!data.status" icon="pi pi-download" class="p-button-rounded p-button-text" @click="download(data.id)"/>
                        <span v-if="downloading.includes(data.id)">
                            <i class="pi pi-spinner pi-spin"></i>
                        </span>
                    </template>
                </Column> -->
            </DataTable>
            </div>
        </div>
        <div v-if="showModal">
            <Dialog :modal=true :visible="showModal" header="Client Information" @hide="showModal=false">
                <span class="p-text-secondary block mb-5">Edit Information</span>
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="username" class="font-semibold w-6rem mr-3">Name</label>
                    <InputText v-model="name" id="username" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="cin" class="font-semibold w-6rem mr-4">CIN</label>
                    <InputText v-model="cin" id="cin" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="pin" class="font-semibold w-6rem mr-4">PIN</label>
                    <InputText v-model="pincode" id="pin" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-5">
                    <label for="email" class="font-semibold w-6rem mr-2">Email</label>
                    <InputText v-model="email" id="email" class="flex-auto" autocomplete="off" />
                </div>
                <div class="save-modal">
                    <Button type="button" label="Cancel" severity="secondary" @click="showModal=false"></Button>
                    <Button type="button" label="Save" @click="addUpdateClient"></Button>
                </div>
            </Dialog>
        </div>
    </div>
    <Toast position="top-center" />
</body>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import moment from 'moment'
import Button from 'primevue/button/Button'
import Dialog from 'primevue/dialog/Dialog'

export default {
    name: 'exportList',
    data () {
        return {
            exportData: [],
            search: '',
            loading: false,
            downloading: [],
            showModal: false,
            name: '',
            cin: '',
            email: '',
            pincode: '',
            id: null
        }
    },
    methods: {
        backtopage () {
            this.$router.go(-1)
        },
        formatDate (date) {
            return moment(date).format('MMM D YYYY, hh:mm A')
        },
        async download (id) {
            this.downloading.push(id)
            let data = {}
            data.id = id
            await this.$store.dispatch('Exports/Downloads/download', data)
            this.downloading.splice(this.downloading.indexOf(id), 1)
        },
        async deleteClient (id) {
            await this.$store.dispatch('Clients/ClientsList/deleteClient', id)
            this.exportData = await this.$store.dispatch('Clients/ClientsList/getClientsList')
        },
        async getSearchClients () {
            if (this.search) {
                this.exportData = await this.$store.dispatch('Clients/ClientsList/getSearchClients', this.search)
            } else {
                this.exportData = await this.$store.dispatch('Clients/ClientsList/getClientsList')
            }
        },
        async searchClient () {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.getSearchClients()
            }, 500)
        },
        openModal (data) {
            if (data) {
                this.id = data.id
                this.name = data.name
                this.cin = data.cin
                this.pincode = data.pincode
                this.email = data.email
            }
            this.showModal = true
            console.log('showModal', this.showModal)
        },
        async addUpdateClient () {
            await this.$store.dispatch('Clients/ClientsList/addUpdateClient', {
                name: this.name,
                cin: this.cin,
                email: this.email,
                pincode: this.pincode,
                id: this.id
            })
            this.id = null
            this.name = ''
            this.email = ''
            this.cin = ''
            this.pincode = ''
            this.showModal = false
            this.exportData = await this.$store.dispatch('Clients/ClientsList/getClientsList')
        }
    },
    components: {
        DataTable,
        Column,
        Dialog,
        Button
    },
    computed: {
        filteredItems: function () {
            return this.exportData.filter(item => {
                // return item.filename.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                return item
            })
        }
    },
    async mounted () {
        this.loading = true
        // await this.$store.dispatch('Exports/Downloads/download')
        this.exportData = await this.$store.dispatch('Clients/ClientsList/getClientsList')
        console.log('test', this.exportData)
        this.loading = false
    }
}
</script>

<style lang='scss' scoped>
.background-clr {
  background-color: white !important;
}
.maincontent {
  height: inherit;
}
.save-modal {
    display: flex;
    justify-content: end;
    gap: 1rem;
}
.csr-pnt {
    cursor: pointer;
}
.create-client {
    width: 14rem;
    justify-content: center;
}
/deep/ .p-component-overlay {
    background-color: rgba(0, 0, 0, 0)
}
</style>
