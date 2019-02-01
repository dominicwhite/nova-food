<template>
    <v-bottom-sheet id="bottom-container" v-model="restaurantSheet" hide-overlay inset>
        <v-expansion-panel>
            <v-expansion-panel-content v-for="restaurant in sheetRestaurants">
                <div slot="header">
                    {{restaurant.name}}
                </div>
                <v-card v-for="inspection in restaurantInspections[restaurant.id]">
                    <v-card-text><b>{{inspection.month}}.{{inspection.day}}.{{inspection.year}}</b><br>
                        Code violations: {{inspection.codes}}<br>
                        Comment: {{inspection.comment}}</v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
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
                    console.log("Deselecting restaurant pin automatically");
                    this.$store.commit('deselectPin');
                }
            },
            sheetRestaurants: function() {
                return this.$store.state.displayRestaurants;
            },
            restaurantInspections: function(){
                return this.$store.state.restaurantInfo;
            }
        }
    }
</script>

<style scoped>
/*.bottom-container {*/
    /*z-index: 1001;*/
/*}*/
</style>