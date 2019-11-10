<template>
    <v-container class="body font-weight-bold">
        <h2 class="display-1"> Ubeat</h2>
        <v-row align="center" class="mt-10">
            <h5 class="display-1"> Albums</h5>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="3" v-for="item in artists" :key="item.color">
                <app-card-artist>
                    <v-card
                            class="mx-auto"
                            :color="item.color"
                            dark
                            max-width="400"
                    >
                        <v-card-title>
                            <v-icon
                                    large
                                    left
                            >
                                {{item.icon}}
                            </v-icon>
                            <span class="title font-weight-light">{{item.style}}</span>
                        </v-card-title>

                        <v-card-text class="headline font-weight-bold">
                           {{item.text}}
                        </v-card-text>

                        <v-card-actions>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-img
                                            class="elevation-6"
                                            :src="item.src"
                                    ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{item.artistName}}</v-list-item-title>
                                </v-list-item-content>

                                <v-row
                                        align="center"
                                        justify="end"
                                >
                                    <v-icon class="mr-1">mdi-heart</v-icon>
                                    <span class="subheading mr-2">{{item.numberLike}}</span>
                                    <span class="mr-1">·</span>
                                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                                    <span class="subheading">{{item.NumberShare}}</span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </app-card-artist>
            </v-col>
        </v-row>
        <v-row align="center" class="mt-10">
            <h5 class="display-1"> Artists</h5>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="3" v-for="item in items" :key="item.color">
              <app-card-album>
                  <v-card
                          class="mx-auto"
                          :color="item.color"
                          dark
                          max-width="400"
                  >
                      <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                              <v-card-title
                                      class="headline"
                                      v-text="item.title"
                              ></v-card-title>

                              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                          </div>

                          <v-avatar
                                  class="ma-3"
                                  size="125"
                                  tile
                          >
                              <v-img :src="item.src"></v-img>
                          </v-avatar>
                      </div>
                      <v-card-actions>
                          <v-btn text>Listen Now</v-btn>
                      </v-card-actions>
                  </v-card>
              </app-card-album>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import cardArtist from "./cardArtist";
    import cardAlbum from "./cardAlbum";
    export default {
        name: "Home",
        components: {
            appCardArtist: cardArtist,
            appCardAlbum: cardAlbum
        },
        data: () => ({
            items: [
                {
                    color: '#952170',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },
                {
                    color: '#952175',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },
                {
                    color: '#1F7087',
                    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                    title: 'Supermodel',
                    artist: 'Foster the People',
                },
                {
                    color: '#1F7080',
                    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                    title: 'Supermodel',
                    artist: 'Foster the People',
                }
            ],

        artists: [
            {
                color: '#26c6da',
                icon: 'mdi-music',
                style: 'Rap',
                text: 'Turns out semicolon-less style is easier and safer',
                src: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
                artistName: 'Evan You',
                numberLike: '260',
                NumberShare: '89'
            },
            {
                color: '#c51162',
                icon: 'mdi-music',
                style: 'Country',
                text: 'Turns out semicolon-less style is easier and safer',
                src: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
                artistName: 'Justin Dj.',
                numberLike: '50',
                NumberShare: '993'
            },
            {
                color: '#880e4f',
                icon: 'mdi-music',
                style: 'Pop',
                text: 'Turns out semicolon-less style is easier and safer',
                src: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
                artistName: 'Nguess R.',
                numberLike: '190',
                NumberShare: '13'
            },
            {
                color: '#4a148c',
                icon: 'mdi-music',
                style: 'Jazz',
                text: 'Turns out semicolon-less style is easier and safer',
                src: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
                artistName: 'Rachel S.',
                numberLike: '150',
                NumberShare: '93'
            }
        ]

        }),
    }
</script>

<style scoped>
.font-weight-bold {
    color: black;
}
</style>