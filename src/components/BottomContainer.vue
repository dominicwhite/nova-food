<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-bottom-sheet id="bottom-container" v-model="restaurantSheet" hide-overlay inset persistent>
        <v-expansion-panel>
            <v-expansion-panel-content class="scroll" v-for="restaurant in sheetRestaurants" :key="restaurant.id">
                <div slot="header">
                    <span class="subheading">{{restaurant.name}}</span>
                </div>

                    <v-card
                            v-for="(inspection, inspection_index) in restaurantInspections[restaurant.id]"
                            class="px-4"
                            :key="restaurant.id + '-' + inspection_index"
                    >
                        <v-card-title class="pa-1" style="border-top: thin lightgray solid;">
                            <span class="body-2">Inspected on: {{inspection.month}}.{{inspection.day}}.{{inspection.year}}</span>
                        </v-card-title>
                        <v-card-text class="py-1">
                            <i>Code violations:</i>
                            <template v-if="inspection.codes">
                                <v-tooltip
                                        top
                                        v-for="(code, code_index) in inspection.codes.replace(' ', '').split(';')"
                                       :key="restaurant.id + '-' + inspection_index + '-' + code_index"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-chip
                                                v-on="on"
                                                class="pa-0 ma-0 mr-1 mb-1 inspection-chip"
                                                v-bind:color="$store.state.violations[code] ? chipColors[$store.state.violations[code]['sev']] : 'grey'"
                                                v-bind:text-color="$store.state.violations[code] ? chipTextColors[$store.state.violations[code]['sev']] : 'black'"
                                        >
                                            {{code}}
                                        </v-chip>
                                    </template>
                                    <span>{{$store.state.violations[code] ? $store.state.violations[code]['desc'] : 'Unknown violation'}}</span>
                                </v-tooltip>
                            </template>
                            <template v-else>
                                <v-chip
                                    class="pa-0 ma-0 mr-1"
                                    color="green"
                                    text-color="white"
                                >
                                    None :)
                                </v-chip>
                            </template>
                            <template v-if="inspection.comment"><br><i>Comment:</i> {{inspection.comment}}</template>
                        </v-card-text>
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
                sheet: false,
                chipColors: {'Core': 'yellow', 'Priority': 'red', 'Priority Foundation': 'orange'},
                chipTextColors: {'Core': 'black', 'Priority': 'white', 'Priority Foundation': 'white'}
            }
        },
        computed:{
            restaurantSheet: {
                get: function() {
                    return this.$store.state.isPinSelected;
                },
                set: function() {
                    if (this.$store.state.isClickOnAnotherPin === true){
                        this.$store.commit('clickOffPin');
                    }
                    else {
                        this.$store.commit('deselectPin');
                    }
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
    .scroll {
        overflow-y: auto;
        max-height: 70%;
    }
    .inspection-chip .tooltiptext{
        display: none;
    }
</style>