<template>
  <div class="mt-10" data-app>

     <v-row no-gutters class="xs-4">
       <v-col>
         <v-card
           class="pa-2"
           outlined
           tile
         >
         <v-data-table
           :headers="headers"
           :items="desserts"
           :page.sync="page"
           :items-per-page="itemsPerPage"
           hide-default-footer
           class="elevation-1"
           @page-count="pageCount = $event"
           :single-select="singleSelect"
           show-select
           :loading="cargar"
         >
           <template v-slot:top>

             <v-toolbar
               flat
             >
               <v-toolbar-title>Contactos</v-toolbar-title>
               <v-divider
                 class="mx-4"
                 inset
                 vertical
               ></v-divider>

               <v-spacer></v-spacer>
               <v-dialog
                 v-model="dialog"
                 max-width="500px"
               >
                 <template v-slot:activator="{ on, attrs }">
                   <v-btn
                     color="primary"
                     dark
                     class="mb-2"
                     v-bind="attrs"
                     v-on="on"
                   >
                     Nuevo Contacto
                   </v-btn>
                 </template>
                 <v-card>
                   <v-card-title>
                     <span class="headline">{{ formTitle }}</span>
                   </v-card-title>

                   <v-card-text>
                     <v-container>
                       <v-row>
                         <v-col
                           cols="12"
                           sm="12"
                           md="12"
                         >
                           <v-text-field
                             v-model="editedItem.nombre"
                             label="Nombre"
                           ></v-text-field>
                         </v-col>
                         <v-col
                           cols="12"
                           sm="12"
                           md="12"
                         >
                           <v-text-field
                             v-model="editedItem.apellido"
                             label="Apellido"
                           ></v-text-field>
                         </v-col>

                         <v-col
                           cols="12"
                           sm="12"
                           md="12"
                         >
                           <v-text-field
                             v-model="editedItem.telefono"
                             label="Teléfono"
                           ></v-text-field>
                         </v-col>
                         <v-col
                           cols="12"
                           sm="12"
                           md="12"
                         >
                           <v-text-field
                             v-model="editedItem.correo"
                             label="Correo"
                           ></v-text-field>
                         </v-col>
                         <v-col
                           cols="12"
                           sm="12"
                           md="12"
                         >
                           <v-textarea
                             v-model="editedItem.observacion"
                             label="Observación"
                           ></v-textarea>
                         </v-col>

                       </v-row>
                     </v-container>
                   </v-card-text>

                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn
                       color="blue darken-1"
                       text
                       @click="close"
                     >
                       Cancelar
                     </v-btn>
                     <v-btn
                       color="blue darken-1"
                       text
                       @click="save"
                     >
                       Guardar
                     </v-btn>
                   </v-card-actions>
                 </v-card>
               </v-dialog>

               <v-dialog v-model="dialogDelete" max-width="500px">
                 <v-card>
                   <v-card-title class="headline">¿Estás seguro de que quieres eliminar este contacto?</v-card-title>
                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                     <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
                     <v-spacer></v-spacer>
                   </v-card-actions>
                 </v-card>
               </v-dialog>

             </v-toolbar>

           </template>

           <template v-slot:item.actions="{ item }">
             <v-icon
               small
               class="mr-2"
               @click="editItem(item)"
             >
               mdi-pencil
             </v-icon>
             <v-icon
               small
               @click="deleteItem(item)"
             >
               mdi-delete
             </v-icon>
           </template>
           <template v-slot:no-data>
             <span>Sin registros</span>
           </template>
         </v-data-table>
         <div class="text-center pt-2">
           <v-pagination
             v-model="page"
             :length="pageCount"
           ></v-pagination>

         </div>

         </v-card>
       </v-col>
     </v-row>

  </div>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      singleSelect: false,
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,
      cargar: true,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          value: 'nombre',
        },
        { text: 'Apellido', value: 'apellido', sortable: false },
        { text: 'Teléfono', value: 'telefono', sortable: false },
        { text: 'Correo', value: 'correo', sortable: false },
        { text: 'Observación', value: 'observacion', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        observacion: '',
      },
      defaultItem: {
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        observacion: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Contacto' : 'Editar Contacto'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
      this.cargar = false;
    },
    methods: {
      initialize () {
        return new Promise((resolve, reject) => {
          axios.get('/api/contactos', {
              headers: { Authorization: "Bearer " + localStorage.getItem('access_token') }
            })
            .then(response => {
              this.desserts = response.data
              resolve(this.desserts)
            })
            .catch(error => {
              reject(error)
            })
        })

      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        return new Promise((resolve, reject) => {
          axios.delete('/api/contactos/'+this.desserts[this.editedIndex].id, {
              headers: { Authorization: "Bearer " + localStorage.getItem('access_token') }
            })
            .then(response => {
              this.desserts.splice(this.editedIndex, 1)
              this.closeDelete()

              resolve(this.desserts)
            })
            .catch(error => {
              reject(error)
            })
        })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.edit()
        } else {
           this.create()
        }
      },
      edit (){
        return new Promise((resolve, reject) => {
          axios.put('/api/contactos/'+this.desserts[this.editedIndex].id,  this.editedItem, {
              headers: { Authorization: "Bearer " + localStorage.getItem('access_token') }
            })
            .then(response => {
              Object.assign(this.desserts[this.editedIndex], this.editedItem)
              this.close()
              resolve(this.desserts)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      create (){
        return new Promise((resolve, reject) => {
          axios.post('/api/contactos',  this.editedItem, {
              headers: { Authorization: "Bearer " + localStorage.getItem('access_token') }
            })
            .then(response => {
              this.desserts.push(this.editedItem)
              this.close()

              resolve(this.desserts)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
  }
</script>
