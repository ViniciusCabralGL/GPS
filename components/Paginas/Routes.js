import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Perfil from './Perfil';
import Cadastrar from './Cadastrar';
import Aguarde from './Aguarde';
import Eventos from './Eventos';
import Agenda from './Agenda';
import Amigos from './Amigos';
import Mapa from './Mapa';

const stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <stack.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#555',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                    padding: 5,
                    paddingBottom: 5,
                    borderTopColor: 'transparent'
                }
            }}
        >
            <stack.Screen
                name='Login'
                component={Login}
            />
            <stack.Screen
                name='Perfil'
                component={Perfil}
            />
            <stack.Screen
                name='Cadastrar'
                component={Cadastrar}
            />
            <stack.Screen
                name='Aguarde'
                component={Aguarde}
            />
            <stack.Screen
                name='Eventos'
                component={Eventos}
            />
            <stack.Screen
                name='Agenda'
                component={Agenda}
            />
            <stack.Screen
                name='Amigos'
                component={Amigos}
            />
            <stack.Screen
                name='Mapa'
                component={Mapa}
            />
        </stack.Navigator>
    )
}
