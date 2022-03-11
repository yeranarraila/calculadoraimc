import React from "react";
import {Text, TextInput, TouchableOpacity, Vibration, View} from "react-native";
import {useState} from "react";
import ResultadoIMC from "./ResultadoIMC/";
import styles from "./styles";


//definir a funcao dos formularios
export default function Form(){


    const[altura,setAltura] = useState(null);
    const[peso,setPeso] = useState(null);
    const[msg,setMsg] = useState("Preencha os campos altura e peso.");
    const[imc,setImc] = useState(null);
    const[textButton,setTextButton] = useState("Calcular");
    const[msgErro,setMsgErro] = useState(null);

    function validaIMCValues(){
        if(altura != null && peso != null){
            setMsg("IMC: ");
            setPeso(null);
            setAltura(null);
            setTextButton("Novo Calculo");
            setMsgErro(null);
        }else{
            if(imc == null){
                setMsgErro("*Campo Obrigatório*");
                Vibration.vibrate(1000);//1 segundo = 1000
            }
            setImc(null);
            setTextButton("Calcular");
            setMsg("Preencha os valores de altura e peso!");
        }
    }

    function calculaIMC(){
        validaIMCValues();
        return setImc((peso/(altura*altura)).toFixed(2));
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.formulario}>
                <Text>Entre com sua Altura:</Text>
                <Text style={styles.errorMessage}>{msgErro}</Text>
                <TextInput 
                    style={styles.formInput}
                    onChangeText={setAltura}
                    value={altura}
                    placeholder="Ex.: 1.71"
                    keyboardType="numeric"
                />
                <Text>Entre com seu Peso:</Text>
                <Text style={styles.errorMessage}>{msgErro}</Text>
                <TextInput 
                    style={styles.formInput}
                    onChangeText={setPeso}
                    value={peso}
                    placeholder="Ex.: 80.5"
                    keyboardType="numeric"
                />
                <TouchableOpacity 
                    style={styles.buttonCalc}
                    onPress= {() => calculaIMC()}
                >
                    <Text style={styles.textButtonCalc}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultadoIMC 
                mensagemResultado={msg} 
                valorResultado = {imc} 
            />
        </View>
    );
}