import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [tarefa, setTarefa] = useState(''); //Definição de primeiro estado
  const [listaDeTarefas, setListaDeTarefas] = useState([]); //Definição de segundo estado

  const handleComAdicionarTarefa = () => { //Evento que pede para o usuário adicionar uma tarefa, usamos o trim para apagar os espaços, caso aconteçam na escrita.
    if (tarefa.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite uma tarefa!');
      return;
    }

    setListaDeTarefas(tarefasAnteriores => [...tarefasAnteriores, { id: Math.random().toString(), texto: tarefa, concluida: false }]);
    setTarefa('');
  };

  const handleComDeletarTarefa = (tarefaId) => {
    setListaDeTarefas(tarefasAnteriores => tarefasAnteriores.filter(item => item.id !== tarefaId));
  };
  
  const handleComConcluirTarefa = (tarefaId) => {
    setListaDeTarefas(tarefasAnteriores =>
      tarefasAnteriores.map(item =>
        item.id === tarefaId ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Lista de Tarefas</Text>
      
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
          onChangeText={setTarefa}
          value={tarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={handleComAdicionarTarefa}>
          <AntDesign name="pluscircle" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={listaDeTarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleComConcluirTarefa(item.id)} style={styles.itemTarefa}>
            <View style={styles.ladoEsquerdoTarefa}>
              {item.concluida ? (
                <FontAwesome5 name="check-circle" size={24} color="#28a745" style={styles.iconeCheck} />
              ) : null}
              <Text style={item.concluida ? [styles.textoTarefa, styles.textoTarefaConcluida] : styles.textoTarefa}>
                {item.texto}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleComDeletarTarefa(item.id)}>
              <AntDesign name="delete" size={24} color="#dc3545" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  botaoAdicionar: {
    padding: 5,
  },
  lista: {
    width: '100%',
  },
  itemTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  ladoEsquerdoTarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconeCheck: {
    marginRight: 10,
  },
  textoTarefa: {
    fontSize: 18,
    color: '#495057',
    flex: 1,
  },
  textoTarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
});
