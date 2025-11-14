# Guia de Desenvolvimento e Padrões de Arquitetura

Este documento detalha o passo a passo para a criação de um novo módulo CRUD completo, garantindo a consistência com a arquitetura e os padrões de código estabelecidos no projeto.

---

## Passo a Passo para Criação de um Módulo CRUD

Siga estas etapas rigorosamente para cada nova entidade do DER que precisar de uma API. O exemplo usará uma entidade hipotética chamada `Submodule`.

### 1. Constantes e Rotas

Antes de criar qualquer arquivo de lógica, configure as constantes e as rotas.

1.  **Adicionar Constante da Entidade:**
    *   Abra `src/commons/constants/constants.system.ts`.
    *   Exporte uma nova constante para a sua entidade em `lowercase`.
    ```typescript
    export const SUBMODULES = 'submodules';
    ```

2.  **Adicionar Rota da Entidade:**
    *   Abra `src/commons/constants/url.sistema.ts`.
    *   Importe a nova constante.
    *   Adicione uma nova entrada ao objeto `ROUTE` usando a função `buildRoutes`. O segundo parâmetro é o nome do parâmetro de ID que será usado na URL.
    ```typescript
    import { DISCIPLINE, MODULES, SUBMODULES } from "./constants.system";

    // ...

    export const ROUTE = {
      DISCIPLINE: buildRoutes(DISCIPLINE, 'disciplineId'),
      MODULES: buildRoutes(MODULES, 'moduleId'),
      SUBMODULES: buildRoutes(SUBMODULES, 'submoduleId'), // Nova rota
    };
    ```

### 2. Estrutura de Arquivos

Crie a seguinte estrutura de diretórios e arquivos para sua nova entidade (ex: `submodule`):

```
src/
└── submodule/
    ├── controller/
    │   ├── submodule.controller.create.ts
    │   ├── submodule.controller.delete.ts
    │   ├── submodule.controller.findAll.ts
    │   ├── submodule.controller.findOne.ts
    │   └── submodule.controller.update.ts
    ├── dto/
    │   ├── converter/
    │   │   └── submodule.converter.dto.ts
    │   ├── request/
    │   │   └── submodule.request.dto.ts
    │   └── response/
    │       └── submodule.response.dto.ts
    ├── entity/
    │   └── submodule.entity.ts
    ├── service/
    │   ├── submodule.service.create.ts
    │   ├── submodule.service.delete.ts
    │   ├── submodule.service.findAll.ts
    │   ├── submodule.service.findOne.ts
    │   └── submodule.service.update.ts
    └── submodule.module.ts
```

### 3. Criação da Entidade (`.entity.ts`)

*   O nome do arquivo e da classe devem ser `SubmoduleEntity`.
*   A classe **deve** estender `BaseEntity`.
*   Use os decoradores do `TypeORM` (`@Entity`, `@PrimaryGeneratedColumn`, `@Column`, etc.).
*   Para chaves estrangeiras, use `@ManyToOne` e `@JoinColumn`.
*   **Importante:** Se você adicionar uma relação `@ManyToOne` (ex: `Submodule` pertence a `Module`), você **deve** atualizar a entidade do outro lado (`ModuleEntity`) para adicionar a relação `@OneToMany`.

### 4. Criação dos DTOs e do Converter

#### a. DTO de Requisição (`.request.dto.ts`)

*   Define a estrutura de dados para `create` e `update`.
*   Use os validadores do `class-validator` (`@IsNotEmpty`, `@IsString`, `@IsNumber`, `@MaxLength`, etc.) com mensagens de erro em português.
*   Inclua os campos para chaves estrangeiras (ex: `moduleId: number`).

#### b. DTO de Resposta (`.response.dto.ts`)

*   Define a estrutura de dados que a API retornará.
*   Use o decorador `@Expose()` do `class-transformer` em todas as propriedades que devem ser expostas.
*   Para relações aninhadas (ex: retornar os dados do `Module` dentro do `Submodule`), use `@Type(() => ModuleResponseDto)`.

#### c. Converter (`.converter.dto.ts`)

*   Crie uma classe com métodos estáticos para transformar dados.
*   **`toSubmoduleEntity(requestDto)`**: Converte o `request.dto.ts` em uma `SubmoduleEntity`. **Atenção:** Para chaves estrangeiras, instancie a entidade relacionada e atribua apenas o ID.
    ```typescript
    const module = new ModuleEntity();
    module.moduleId = requestDto.moduleId;
    submoduleEntity.module = module;
    ```
*   **`toSubmoduleResponse(entity)`**: Converte uma única `SubmoduleEntity` em uma `SubmoduleResponseDto` usando `plainToInstance`.
*   **`toListSubmoduleResponse(entities)`**: Converte um array de `SubmoduleEntity` em um array de `SubmoduleResponseDto` usando `plainToInstance`.

### 5. Implementação dos Serviços (`.service.*.ts`)

*   Crie um arquivo de serviço para cada ação CRUD.
*   Injete o repositório com `@InjectRepository(SubmoduleEntity)`.
*   **`create`**: Recebe o DTO de requisição, usa o `converter` para criar a entidade e a salva.
*   **`findAll`**: Usa `repository.find()`. Sempre inclua `{ relations: ['...'] }` para carregar as entidades relacionadas. Adicione `{ order: { ... } }` para consistência.
*   **`findOne`**: Usa `repository.findOne()`. Se não encontrar, lança `new NotFoundException('Mensagem de erro')`.
*   **`update`**: Usa `repository.preload()` para mesclar os dados e verificar se a entidade existe. Se `preload` retornar `null` ou `undefined`, lança `NotFoundException`.
*   **`delete`**: Usa `repository.delete(id)`. Verifica se `result.affected === 0` para lançar `NotFoundException`.

### 6. Implementação dos Controladores (`.controller.*.ts`)

*   Crie um arquivo de controlador para cada rota.
*   **NÃO** use anotações do Swagger (`@Api...`).
*   O decorador do controlador base é `@Controller(ROUTE.SUBMODULES.BASE)`.
*   Use os decoradores de método (`@Post`, `@Get`, etc.) com as rotas específicas: `@Post(ROUTE.SUBMODULES.CREATE)`.
*   Defina o código de status da resposta com `@HttpCode(HttpStatus.OK)` ou `@HttpCode(HttpStatus.CREATED)`.
*   A assinatura do método deve retornar `Promise<Result<ResponseType>>`.
*   Chame o serviço correspondente.
*   Use o `converter` para transformar a entidade retornada pelo serviço em um DTO de resposta.
*   Retorne a resposta final usando `MessageSystem.showMessage(...)`.

### 7. Criação do Módulo (`.module.ts`)

*   Crie o arquivo `submodule.module.ts`.
*   Importe e declare arrays `submoduleControllers` e `submoduleServices` com todos os controladores e serviços criados.
*   No `@Module`, configure:
    *   `imports`: `[TypeOrmModule.forFeature([SubmoduleEntity])]`
    *   `controllers`: `[...submoduleControllers]`
    *   `providers`: `[...submoduleServices]`
    *   `exports`: `[TypeOrmModule, ...submoduleServices]`

### 8. Registro no Módulo Principal

*   Finalmente, abra `src/app.module.ts`.
*   Importe o `SubmoduleModule`.
*   Adicione-o ao array `imports` do `AppModule`.

---
**Fim do Guia.** Seguindo estas etapas, a consistência do projeto será mantida.
