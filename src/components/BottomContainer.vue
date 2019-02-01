<template>
    <v-bottom-sheet id="bottom-container" v-model="restaurantSheet" hide-overlay>
        <v-list>
            <v-list-tile v-for="restaurant in sheetRestaurants">
                <v-list-tile-content>
                    <v-list-tile-title v-text="restaurant.name"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "BottomContainer",
        data: function(){
            return {
                sheet: false
            }
        },
        computed:{
            restaurantSheet: {
                get: function() {
                    return this.$store.state.isPinSelected;
                },
                set: function() {
                    this.$store.commit('deselectPin');
                }
            },
            sheetRestaurants: function() {
                return this.$store.state.displayRestaurants;
            }
        }
    }
</script>

<style scoped>
/*.bottom-container {*/
    /*z-index: 1001;*/
/*}*/
</style>