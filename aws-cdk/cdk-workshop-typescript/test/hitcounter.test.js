"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const hitcounter_1 = require("../lib/hitcounter");
test('DynamoDB Table Created With Encryption', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'lambda.handler',
            code: lambda.Code.fromInline('test')
        })
    });
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource('AWS::DynamoDB::Table', {
        SSESpecification: {
            SSEEnabled: true
        }
    }));
});
test('Lambda Has Environment Variables', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'lambda.handler',
            code: lambda.Code.fromInline('test')
        })
    });
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource('AWS::Lambda::Function', {
        Environment: {
            Variables: {
                DOWNSTREAM_FUNCTION_NAME: { "Ref": ["TestFunction22AD90FC"] },
                HITS_TABLE_NAME: { "Ref": ["MyTestConstructHits24A357F0"] }
            }
        }
    }));
});
test('read capacity can be configured', () => {
    const stack = new cdk.Stack();
    expect(() => {
        new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
            downstream: new lambda.Function(stack, 'TestFunction', {
                runtime: lambda.Runtime.NODEJS_10_X,
                handler: 'lambda.handler',
                code: lambda.Code.fromInline('test')
            }),
            readCapacity: 3
        });
    }).toThrowError(/readCapacity must be greater than 5 and less than 20/);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGl0Y291bnRlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQW9FO0FBQ3BFLHFDQUFzQztBQUN0Qyw4Q0FBOEM7QUFFOUMsa0RBQStDO0FBRS9DLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFOUIsT0FBTztJQUNQLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7UUFDckMsVUFBVSxFQUFFLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO1lBQ25ELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ3ZDLENBQUM7S0FDTCxDQUFDLENBQUM7SUFFSCxPQUFPO0lBQ1AsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLHNCQUFzQixFQUFFO1FBQ3JELGdCQUFnQixFQUFFO1lBQ2QsVUFBVSxFQUFFLElBQUk7U0FDbkI7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUMxQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUU5QixPQUFPO0lBQ1AsSUFBSSx1QkFBVSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtRQUNyQyxVQUFVLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7WUFDbkQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDdkMsQ0FBQztLQUNMLENBQUMsQ0FBQztJQUVILE9BQU87SUFDUCxlQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFZLENBQUMsdUJBQXVCLEVBQUU7UUFDdEQsV0FBVyxFQUFFO1lBQ1QsU0FBUyxFQUFFO2dCQUNQLHdCQUF3QixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDN0QsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsNkJBQTZCLENBQUMsRUFBRTthQUM5RDtTQUNKO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFOUIsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNSLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7WUFDckMsVUFBVSxFQUFFLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUNuQyxPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2FBQ3ZDLENBQUM7WUFDRixZQUFZLEVBQUUsQ0FBQztTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsc0RBQXNELENBQUMsQ0FBQztBQUM1RSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cGVjdCBhcyBleHBlY3RDREssIGhhdmVSZXNvdXJjZSB9IGZyb20gJ0Bhd3MtY2RrL2Fzc2VydCc7XG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuXG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSAnLi4vbGliL2hpdGNvdW50ZXInO1xuXG50ZXN0KCdEeW5hbW9EQiBUYWJsZSBDcmVhdGVkIFdpdGggRW5jcnlwdGlvbicsICgpID0+IHtcbiAgICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcblxuICAgIC8vIFdIRU5cbiAgICBuZXcgSGl0Q291bnRlcihzdGFjaywgJ015VGVzdENvbnN0cnVjdCcsIHtcbiAgICAgICAgZG93bnN0cmVhbTogbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgJ1Rlc3RGdW5jdGlvbicsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICAgICAgICAgICAgaGFuZGxlcjogJ2xhbWJkYS5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21JbmxpbmUoJ3Rlc3QnKVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgLy8gVEhFTlxuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKCdBV1M6OkR5bmFtb0RCOjpUYWJsZScsIHtcbiAgICAgICAgU1NFU3BlY2lmaWNhdGlvbjoge1xuICAgICAgICAgICAgU1NFRW5hYmxlZDogdHJ1ZVxuICAgICAgICB9XG4gICAgfSkpO1xufSk7XG5cbnRlc3QoJ0xhbWJkYSBIYXMgRW52aXJvbm1lbnQgVmFyaWFibGVzJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjaygpO1xuXG4gICAgLy8gV0hFTlxuICAgIG5ldyBIaXRDb3VudGVyKHN0YWNrLCAnTXlUZXN0Q29uc3RydWN0Jywge1xuICAgICAgICBkb3duc3RyZWFtOiBuZXcgbGFtYmRhLkZ1bmN0aW9uKHN0YWNrLCAnVGVzdEZ1bmN0aW9uJywge1xuICAgICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICAgICAgICBoYW5kbGVyOiAnbGFtYmRhLmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUlubGluZSgndGVzdCcpXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAvLyBUSEVOXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoJ0FXUzo6TGFtYmRhOjpGdW5jdGlvbicsIHtcbiAgICAgICAgRW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAgIFZhcmlhYmxlczoge1xuICAgICAgICAgICAgICAgIERPV05TVFJFQU1fRlVOQ1RJT05fTkFNRTogeyBcIlJlZlwiOiBbXCJUZXN0RnVuY3Rpb24yMkFEOTBGQ1wiXSB9LFxuICAgICAgICAgICAgICAgIEhJVFNfVEFCTEVfTkFNRTogeyBcIlJlZlwiOiBbXCJNeVRlc3RDb25zdHJ1Y3RIaXRzMjRBMzU3RjBcIl0gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufSk7XG5cbnRlc3QoJ3JlYWQgY2FwYWNpdHkgY2FuIGJlIGNvbmZpZ3VyZWQnLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG5cbiAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBuZXcgSGl0Q291bnRlcihzdGFjaywgJ015VGVzdENvbnN0cnVjdCcsIHtcbiAgICAgICAgICAgIGRvd25zdHJlYW06IG5ldyBsYW1iZGEuRnVuY3Rpb24oc3RhY2ssICdUZXN0RnVuY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogJ2xhbWJkYS5oYW5kbGVyJyxcbiAgICAgICAgICAgICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tSW5saW5lKCd0ZXN0JylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgcmVhZENhcGFjaXR5OiAzXG4gICAgICAgIH0pO1xuICAgIH0pLnRvVGhyb3dFcnJvcigvcmVhZENhcGFjaXR5IG11c3QgYmUgZ3JlYXRlciB0aGFuIDUgYW5kIGxlc3MgdGhhbiAyMC8pO1xufSk7XG4iXX0=