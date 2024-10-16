import { ComponentId } from "./navigationProps"
import { Navigation } from 'react-native-navigation';

export interface RootRouter {
    pushScreen(name: string, _: ComponentId): void
    modalScreen(name: string): void
    modalInStackScreen(name: string): void
    pushNativeScreen(name: string, _: ComponentId): void
    modalNativeScreen(name: string): void
    modalInStackNativeScreen(name: string): void
}

const Colors = {
  buttonColor: '#14B746',
  titleColor: '#000000'
}

export const CommonButtonIds = {
  closeButton: 'CloseButton'
}

export class RootRouterImpl implements RootRouter {
    pushScreen(name: string, componentId: ComponentId): void {
      Navigation.push(componentId, {
        component: {
            name: name,
            options: {
              topBar: {
                  title: {
                    text: name,
                    color: Colors.titleColor
                  },
                  backButton: {
                    color: Colors.buttonColor
                  }
              }
            }
          }
        }
    )
  }

    modalScreen(name: string): void {
        Navigation.showModal({
            component: {
              name: name,
              options: {
                topBar: {
                  title: {
                    text: name,
                    color: Colors.titleColor
                  }
               }
              }
            }
          })  
    }

    modalInStackScreen(name: string): void {
        Navigation.showModal({
            stack: {
              children: [
                {
                  component: {
                    name: name,
                    options: {
                      topBar: {
                        title: {
                          text: name
                        },
                        backButton: {
                          color: Colors.buttonColor
                        },
                        rightButtons: [
                          {
                            id: CommonButtonIds.closeButton,
                            text: "Close",
                            color: Colors.buttonColor,
                          }
                        ]
                      }
                    }       
                  }
                }
              ]
            }
          })     
    }

    pushNativeScreen(name: string, componentId: ComponentId): void {
      Navigation.push(componentId, {
        externalComponent: {
          name: name,
          options: {
            topBar: {
                title: {
                  text: name,
                  color: Colors.titleColor
                },
                backButton: {
                  color: Colors.buttonColor
                }
            }
          }
        }
      })
    }
    modalNativeScreen(name: string): void {
      Navigation.showModal( {
        externalComponent: {
          name: name,
          options: {
            topBar: {
                title: {
                  text: name,
                  color: Colors.titleColor
                },
                backButton: {
                  color: Colors.buttonColor
                }
            }
          }
        }
      })
    }
    modalInStackNativeScreen(name: string): void {
      Navigation.showModal( {
        stack: {
          children: [{
            externalComponent: {
              name: name,
              options: {
                topBar: {
                  title: {
                    text: name
                  },
                  backButton: {
                    color: Colors.buttonColor
                  },
                  rightButtons: [
                    {
                      id: CommonButtonIds.closeButton,
                      text: "Close",
                      color: Colors.buttonColor,
                    }
                  ]
                }
              }       

            }
          }]
        }
      })
    }
}